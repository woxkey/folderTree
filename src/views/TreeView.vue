<template>
  <Tree :tree="tree" @reRender="handleReRender" :node-map="nodeMap" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { fetchItems } from "../api/treeApi";
import Tree from "../components/Tree.vue";
import { buildTree, setNodeMap, openTreeNodesByIds } from "../utils/treeUtils";

const tree = ref([]);
const nodeMap = ref(new Map());

const fetchData = async () => {
  const data = await fetchItems();
  const nodes = buildTree(data);
  setNodeMap(data, nodeMap);
  tree.value = nodes;
};

const handleReRender = async (openNodes) => {
  await fetchData();
  const openNodesIds = Array.from(openNodes.value);
  const newTree = openTreeNodesByIds(tree.value, openNodesIds);
  tree.value = newTree;
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped></style>
