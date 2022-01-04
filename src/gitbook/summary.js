const fs = require('fs')

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
function summarizeNode(node, name, path = '') {
  let summary = '';
  const nodePath = getPath(name, path);

  const depth = (nodePath.split('/').length - 1);
  let indent = '';
  let titleDepth = '###';

  for(let i = 0; i < depth; i += 1) {
    indent += '    ';
    titleDepth += '#';
  }

  // If folder, Set a tittle
  if (node.type === TYPE_DIR) {
    summary += '\n';
    summary += `${titleDepth} ${node.name}`;
  } else {      
    summary += '\n';
    summary += `${indent}* [${node.name.replace('.md', '')}](${nodePath})`;
  }

  return summary;
}

/**
 *
 */
function summarizeNodes(index, path = '') {
  let summary = '';

  const nodes = Object.keys(index);

  for (let i = 0; i < nodes.length; i += 1) {
    const node = index[nodes[i]];
    
    summary += summarizeNode(node, nodes[i], path)

    if (node.type === TYPE_DIR && typeof node.content !== 'undefined') {
      const nodePath = getPath(nodes[i], path);
      summary += summarizeNodes(node.content, `${nodePath}`);
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

  summary += summarizeNodes(index);

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
