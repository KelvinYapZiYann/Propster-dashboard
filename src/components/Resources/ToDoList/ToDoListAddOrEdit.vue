<template>
  <form @submit.prevent>
    <card>
      <h5 slot="header" class="title">{{addOrEdit}} {{$t('sidebar.todoList')}}</h5>
      <div class="row">
        <div class="col-12">
          <base-input :label="$t('property.title')"
                      :placeholder="$t('property.title')"
                      v-model="resource.model.title"
                      :error="tmpApiValidationErrors.title ? tmpApiValidationErrors.title[0] : ''">
          </base-input>
        </div>

        <div class="col-12">
          <base-input :label="$t('property.content')"
                      :placeholder="$t('property.content')"
                      v-model="resource.model.content"
                      :error="tmpApiValidationErrors.content ? tmpApiValidationErrors.content[0] : ''">
          </base-input>
        </div>
      </div>
    </card>
    <base-button slot="footer" type="info" @click="handleCancel()" fill>{{$t('component.cancel')}}</base-button>
    <base-button slot="footer" native-type="submit" type="info" @click="handleSubmit()" fill>{{addOrEdit}}</base-button>
  </form>
</template>
<script>
import formMixin from "@/mixins/form-mixin";
import { BaseInput, Card, ValidationError } from "@/components";

export default {
  mixins: [formMixin],
  components: {
    ValidationError,
    BaseInput,
    Card,
  },
  props: {
    resource: {
      type: Object,
      required: true,
      default: {
        model: {},
        data: {},
        selector: []
      },
      description: "Resource info",
    },
    addOrEdit: {
      type: String,
      required: true,
      default: "Add"
    },
    tmpApiValidationErrors: {
      type: Object,
      required: true,
      default: function() {
        return {};
      }
    }
  },
  mounted() {
  },
  methods: {
    async handleSubmit() {
      this.$emit('submit', this.translateModel())
    },
    async handleCancel() {
      this.$emit('cancel')
    },
    translateModel() {
      if (this.addOrEdit == 'Add') {
        return {
          title: this.resource.model.title,
          content: this.resource.model.content,
          status: false,
        }
      } else {
        return {
          title: this.resource.model.title,
          content: this.resource.model.content,
          status: this.resource.model.status,
        }
      }
    },
  }
}
</script>
<style></style>
