const fs = require('fs')
const fse = require('fs-extra')

const { TYPE_DIR } = require('./utils/nodes');

/**
 *
 */
function getPath(name, path) {
  let nodePath = `${name}`;
  if (!!path) {
    nodePath = `${path}/${name}`;
  }

  return nodePath;
} 

/**
 *
 */
async function summarizeNode(node, name, path = '') {
  let summary = '';
  let nodePath = getPath(name, path);

  const depth = (nodePath.split('/').length - 1);
  let indent = '';
  // let titleDepth = '###';

  for(let i = 0; i < depth; i += 1) {
    indent += '    ';
    // titleDepth += '#';
  }

  // ToDo: If folder is heading, mark it as so. 
  // if (node.type === TYPE_DIR && isSectionHeader(node.name)) {
  //   summary += '\n';
  //   summary += `${titleDepth} ${node.name}`;
  // }

  // If folder, create a README.md inside
  if (node.type === TYPE_DIR) {
    // If not README.md, create one
    nodePath += '/README.md';
    const exists = await fse.pathExists(nodePath);

    if (!exists) {
      let data = `# ${node.name}\n`;
      fs.writeFileSync(nodePath, data);
    }
  }

  summary += '\n';
  summary += `${indent}* [${node.name.replace('.md', '')}](${nodePath})`;

  return summary;
}

/**
 *
 */
async function summarizeNodes(index, path = '') {
  let summary = '';

  const nodes = Object.keys(index);

  for (let i = 0; i < nodes.length; i += 1) {
    const node = index[nodes[i]];
    
    summary += await summarizeNode(node, nodes[i], path)

    if (node.type === TYPE_DIR && typeof node.content !== 'undefined') {
      const nodePath = getPath(nodes[i], path);
      summary += await summarizeNodes(node.content, `${nodePath}`);
      summary += '\n';
    }
  }

  return summary;
}

/**
 *
 */
async function summarize(path, index) {
  // ToDo: If index not created, create one
  // ToDo: Instead of Summary, get the title from settings.json
  let summary = '# Summary\n';

  summary += await summarizeNodes(index, path);

  try {
    fs.writeFileSync(`${path}/SUMMARY.md`, summary);
    //file written successfully
    
    console.log('> SUMMARY.md created');
    return summary;
  } catch (e) {
    console.error('Error crating SUMMARY.md');
    console.error(e);
  }

}

module.exports = summarize;
