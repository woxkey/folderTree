<template>
  <div>
    <button @click="reRender">Reload</button>
    <ul>
      <TreeNode
        v-for="node in tree"
        :key="node.id"
        :node="node"
        :node-map="nodeMap"
        @updateOpenNodes="updateOpenNodes"
      />
    </ul>
  </div>
</template>

<script setup>
import { provide, ref } from "vue";
import TreeNode from "./TreeNode.vue";

const props = defineProps({
  tree: Array,
  nodeMap: Map,
});
const emit = defineEmits(["reRender"]);

const openNodes = ref(new Set());

const reRender = () => {
  emit("reRender", openNodes);
};

const updateOpenNodes = (nodeId, nodeOpen) => {
  if (nodeOpen) {
    openNodes.value.add(nodeId);
  } else {
    openNodes.value.delete(nodeId);
  }
};

provide("updateOpenNodes", updateOpenNodes);
</script>

<style scoped>
div {
  padding: 10px 30px 0;
}

div ul {
  padding-top: 1rem;
}
</style>
