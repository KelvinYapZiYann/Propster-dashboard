<template>
  <div class="dropdown form-group" v-if="options"  :class="{
          'input-group': hasIcon,
          'input-group-focus': focused
       }">
    <slot name="label">
      <label v-if="label" class="control-label">
        {{label}}
      </label>
    </slot>
    <slot name="addonLeft">
      <span v-if="addonLeftIcon" class="input-group-prepend">
        <div class="input-group-text">
          <i :class="addonLeftIcon"></i>
        </div>
      </span>
    </slot>
    <slot>

        <el-select
            class="select-primary"
            size="large"
            :placeholder="placeholder"
            v-model="value"
        >
          <el-option
              v-for="option in options"
              class="select-primary"
              :value="option.id"
              :label="option.name"
              :key="option.name"
          >
          </el-option>
        </el-select>
    </slot>
    <slot name="addonRight">
      <span v-if="addonRightIcon" class="input-group-append">
        <div class="input-group-text">
          <i :class="addonRightIcon"></i>
        </div>
      </span>
    </slot>
    <slot name="helperText"></slot>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  template: 'Dropdown',
  props: {
    label: {
      type: String,
      description: "Input label"
    },
    addonRightIcon: {
      type: String,
      description: "Input icon on the right"
    },
    addonLeftIcon: {
      type: String,
      description: "Input icon on the left"
    },
    value: {
      type: [String, Number],
      description: "Input value"
    },
    options: {
      type: Array,
      required: true,
      default: [],
      note: 'Options of dropdown. An array of options with id and name',
    },
    placeholder: {
      type: String,
      required: false,
      default: 'Please select an option',
      note: 'Placeholder of dropdown'
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
      note: 'Disable the dropdown'
    },
  },
  model: {
    prop: 'value',
    event: 'selected'
  },
  methods: {
    handleOptionClick(value) {
      this.$emit('selected', value);
    },
  }
};
</script>
