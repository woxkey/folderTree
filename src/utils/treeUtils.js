export const buildTree = (nodes, parentId = null) => {
  const tree = [];
  for (const node of nodes) {
    if (node.parent_id === parentId) {
      const children = buildTree(nodes, node.id);
      if (children.length) {
        node.children = children;
        node.open = false;
      }
      tree.push(node);
    }
  }
  return tree;
};

export const openTreeNodesByIds = (tree, idsToUpdate) => {
  const newTree = JSON.parse(JSON.stringify(tree));

  const traverseTree = (node) => {
    if (idsToUpdate.includes(node.id)) {
      node.open = true;
    }

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => {
        traverseTree(child);
      });
    }
  };

  newTree.forEach((node) => {
    traverseTree(node);
  });

  return newTree;
};

export const setNodeMap = (data, nodeMap) => {
  data.forEach((node) => {
    nodeMap.value.set(node.id, node);
  });
};
