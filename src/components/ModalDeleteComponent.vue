<template>
  <div class="modal fade" id="deleteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
       aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">{{ title }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <form>
          <div class="modal-body">
            Вы действительно не хотели бы видеть данную запрись ?


          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary btn-success" @click.prevent="method(modelId)" data-bs-dismiss="modal">Да</button>
            <button class="btn btn-primary btn-danger" @click.prevent="" data-bs-dismiss="modal">Нет</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "ModalDeleteComponent",
  props: ['title', 'method', 'modelId'],



  data() {
    return {
    }

  },

  methods: {}
}

</script>

<style scoped>

</style>