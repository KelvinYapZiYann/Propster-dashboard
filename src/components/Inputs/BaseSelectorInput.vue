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
    <!-- Dropdown Input -->
    <input class="form-control"
           aria-describedby="addon-right addon-left"
           autocomplete="off"
           :name="name"
           @focus="showOptions()"
           @blur="exit()"
           @keyup="keyMonitor"
           v-model="searchFilter"
           :disabled="disabled"
           :placeholder="placeholder" />

    <!-- Dropdown Menu -->
    <div class="dropdown-content"
         v-show="optionsShown">
      <div
        class="dropdown-item"
        @mousedown="selectOption(option)"
        v-for="(option, index) in filteredOptions"
        :key="index"
        >
        {{ option.name || option.id || '-' }}
      </div>
    </div>
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
    initialValue: {
      type: [String, Number],
      description: "Default Value"
    },
    value: {
      type: [String, Number],
      description: "Input value"
    },
    name: {
      type: String,
      required: false,
      default: 'dropdown',
      note: 'Input name'
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
    maxItem: {
      type: Number,
      required: false,
      default: 6,
      note: 'Max items showing'
    }
  },
  model: {
    prop: 'value',
    event: 'selected'
  },
  data() {
    return {
      hasIcon: false,
      focused: false,
      selected: {},
      optionsShown: false,
      searchFilter: ''
    }
  },
  created() {
    this.$emit('selected', this.selected.id);
  },
  mounted() {
    // this.checkIfSelected()
  },
  computed: {
    filteredOptions() {
      const filtered = [];
      const regOption = new RegExp(this.searchFilter, 'ig');
      for (const option of this.options) {
        if (this.searchFilter.length < 1 || option.name.match(regOption)){
          if (filtered.length < this.maxItem) filtered.push(option);
        }
      }
      return filtered;
    }
  },
  methods: {
    checkIfSelected() {
      let options = this.filteredOptions;
      for (let index in options) {
        let option = options[index];
        if (option.id == this.value) {
          // this.selectOption(option);
        }
      }
    },
    selectOption(option) {
      this.selected = option;
      this.optionsShown = false;
      this.searchFilter = this.selected.name;
      this.$emit('selected', this.selected.id);
    },
    showOptions(){
      if (!this.disabled) {
        this.searchFilter = '';
        this.optionsShown = true;
      }
    },
    exit() {
      if (!this.selected.id) {
        this.selected = {};
        this.searchFilter = '';
      } else {
        this.searchFilter = this.selected.name;
      }
      this.$emit('selected', this.selected.id);
      this.optionsShown = false;
    },
    // Selecting when pressing Enter
    keyMonitor: function(event) {
      if (event.key === "Enter" && this.filteredOptions[0])
        this.selectOption(this.filteredOptions[0]);
    }
  },
  watch: {
    searchFilter() {
      if (this.filteredOptions.length === 0) {
        this.selected = {};
      } else {
        this.selected = this.filteredOptions[0];
      }
      this.$emit('filter', this.searchFilter);
    },
    initialValue: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        if (oldValue == null && newValue != null) {
          let options = this.filteredOptions;
          for (let index in options) {
            let option = options[index];
            if (option.id == newValue) {
              this.selectOption(option);
            }
          }
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.dropdown-content {
  position: absolute;
  background-color: #2b3553;
  width: 100%;
  min-width: 248px;
  max-width: none;
  max-height: 300px;
  border: 1px solid #2b3553;
  box-shadow: 0px -8px 34px 0px rgba(0,0,0,0.05);
  overflow: auto;
  z-index: 1;
  color: #ffffcc;
  .dropdown-item {
    color: #ffffcc;
    font-size: .7em;
    line-height: 1em;
    padding: 8px;
    text-decoration: none;
    display: block;
    cursor: pointer;
    &:hover {
      background-color: #e14eca;
    }
  }
}
.dropdown:hover .dropdowncontent {
  display: block;
}
</style>
