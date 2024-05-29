<template>
  <li>
    <div @click="handleNodeClick" :style="nodeStyle">
      <img v-if="node.children" :src="iconAngle" alt="icon_angle_right" />
      <span :style="!node.children && 'margin-left: 10px'">{{
        props.node.title
      }}</span>
    </div>
    <ul v-if="node.open">
      <TreeNode
        v-for="node in node.children"
        :key="node.id"
        :node="node"
        :node-map="nodeMap"
        @updateOpenNodes="updateOpenNodes"
      />
    </ul>
  </li>
</template>

<script setup>
import { computed, inject } from "vue";
import { FILE_PADDING_CONSTANT } from "../constants";
import icon_angle_right from "../assets/icons/angle-right-solid.svg";
import icon_angle_down from "../assets/icons/angle-down-solid.svg";

const props = defineProps({
  node: Object,
  nodeMap: Map,
});
const emit = defineEmits(["updateOpenNodes"]);
const updateOpenNodes = inject("updateOpenNodes");

const iconAngle = computed(() => {
  return props.node.open ? icon_angle_down : icon_angle_right;
});

const nodeStyle = computed(() => {
  let level = 0;
  let parent = props.node;
  while (parent.parent_id !== null) {
    parent = props.nodeMap.get(parent.parent_id);
    level++;
  }

  const baseStyle = {
    "padding-left": (level + 1) * FILE_PADDING_CONSTANT + "px",
    cursor: props.node.children ? "pointer" : null,
  };

  const evenNodeStyle = {
    backgroundColor: level === 0 ? "#d9d7d7" : "#f0f0f0",
    ...baseStyle,
  };
  const oddNodeStyle = {
    backgroundColor: level === 0 ? "#d9d7d7" : "#ffffff",
    ...baseStyle,
  };
  return level % 2 === 0 ? evenNodeStyle : oddNodeStyle;
});

const handleNodeClick = () => {
  if (props.node.children) {
    props.node.open = !props.node.open;
    emit("updateOpenNodes", props.node.id, props.node.open);
  }
};
</script>

<style scoped>
img {
  width: 10px;
  height: 10px;
  padding-right: 5px;
}

div {
  padding: 5px;
}
</style>
