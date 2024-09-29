<template>
  <div class="modal fade" id="editModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <form @submit.prevent="save(data)">
          <div class="modal-body">

            <div class="row">
              <label for="brand" class="form-label w-auto">Марка</label>
              <select class="form-select w-auto" id="brand" aria-describedby="brand" v-model="data.brand.id" required>
                <option
                    v-for="item in this.brands"
                    :value="item.id"
                    :selected="item.id === params.brand.id"
                    :key="item.id"
                >{{ item.name }}
                </option>
              </select>
            </div>
            <div class="row">
              <label for="model" class="form-label w-auto">Модель</label>
              <input type="text" class="form-control w-auto" id="model" v-model="data.name" required>
            </div>
            <div class="row">
              <label for="color" class="form-label w-auto">Цвет</label>
              <input type="text" class="form-control w-auto" id="color" v-model="data.attributes.color" required>
            </div>
            <div class="row">
              <label for="rul" class="form-label w-auto">Положение руля</label>
              <input type="text" class="form-control w-auto" id="rul" v-model="data.attributes.steering_position" required>
            </div>

          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {ref, watchEffect} from "vue";

export default {
  name: "ModalEditComponent",
   props: ['title', 'params', 'page', 'method'],

  computed: {
    ...mapGetters({
      brands: 'brandAll',
    }),
  },

  setup(props) {
     const data = ref({...props.params})

    watchEffect(() => {
      data.value = {...props.params};
    });

    return {
      data
    }
  },

  data() {
    return {
      loading: false,
      newParams: this.params.name
    }

  },

  methods: {
    async getAllBrands() {
      this.loading = true;
      try {
        await this.$store.dispatch('getALlBrands').catch(response => {
          console.log(response)
        })
      } catch (data) {
        console.log(data)
      } finally {
        this.loading = false;
      }
    },

    save(modelId, params){
      this.method(modelId, params)
    },

  },
  mounted() {
    this.getAllBrands()
  }
}

</script>

<style scoped>

</style>