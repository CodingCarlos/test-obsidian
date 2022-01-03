const { TYPE_DIR } = require('./utils/nodes');
/*
# Summary

* [Part I](part1/README.md)
    * [Writing is nice](part1/writing.md)
    * [GitBook is nice](part1/gitbook.md)
* [Part II](part2/README.md)
    * [We love feedback](part2/feedback_please.md)
    * [Better tools for authors](part2/better_tools.md)
*/

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
  let tabulation = '';
  let subtitle = '#';

  for(let i = 0; i < depth; i += 1) {
    tabulation += '    ';
    subtitle += '#';
  }

  // If folder, Set a tittle
  if (node.type === TYPE_DIR) {
    summary += '\n';
    summary += `${subtitle} ${node.name}`;
  } else {      
    summary += '\n';
    summary += `${tabulation}* [${node.name}](${nodePath})`;
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
    }
  }

  return summary;
}

/**
 *
 */
function summarize(index) {
  let summary = '# Summary';

  const node = summarizeNodes(index);

  console.log('> SUMMARY.md created');
  return summary;
}

module.exports = summarize;
