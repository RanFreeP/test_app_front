<template>
  <div class="p-3 h2">Таблица</div>
  <LoadComponent v-if="loading"/>
  <div class="table-responsive">
    <table v-if="!loading" class="table table-striped">
      <thead>
      <tr>
        <th scope="col">Марка</th>
        <th scope="col">Модель</th>
        <th scope="col">Положение руля</th>
        <th scope="col">Цвет</th>
        <th v-if="isRightEdit || isRightDelete || isRightAdd" scope="col">Действие</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item) in models.body" :key="item.id">
        <td>{{ item.brand.name }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.attributes.steering_position }}</td>
        <td>{{ item.attributes.color }}</td>
        <td>
        <span v-if="isRightEdit" @click="showModal('Редактирование', item)" data-bs-toggle="modal"
              data-bs-target="#editModal"
              style="cursor: pointer" class="m-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square"
             viewBox="0 0 16 16">
          <path
              d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
          </span>
          <span v-if="isRightDelete" @click="showModal('Удаление', item)" data-bs-toggle="modal"
                data-bs-target="#deleteModal"
                style="cursor: pointer" class="m-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square"
             viewBox="0 0 16 16">
            <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
            <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
          </svg>
          </span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <button
      v-if="isRightAdd"
      type="button"
      class="btn btn-outline-primary justify-content-end"
      @click="showModal('Добавление')"
      data-bs-toggle="modal"
      data-bs-target="#editModal"
  >Добавить запись
  </button>
  <nav aria-label="Пример навигации по страницам">
    <ul class="pagination justify-content-end">
      <li
          class="page-item"
          :class="{ 'disabled': page-1 <= 0 }"
          @click="pageCount(page-1)"
      >
        <a class="page-link" href="#">Предыдущая</a>
      </li>
      <li v-if="page-3 > 0" class="page-item"><span class="page-link">...</span></li>
      <li v-if="page-2 > 0" @click="pageCount(page-2)" class="page-item"><a class="page-link"
                                                                            href="#">{{ page - 2 }}</a></li>
      <li v-if="page-1 > 0" @click="pageCount(page-1)" class="page-item"><a class="page-link"
                                                                            href="#">{{ page - 1 }}</a></li>
      <li class="page-item active"><a class="page-link" href="#">{{ page }}</a></li>
      <li v-if="page+1 <= models.pagesCount" @click="pageCount(page+1)" class="page-item"><a class="page-link"
                                                                                             href="#">{{
          page + 1
        }}</a>
      </li>
      <li v-if="page+2 < models.pagesCount" @click="pageCount(page+2)" class="page-item"><a class="page-link"
                                                                                            href="#">{{
          page + 2
        }}</a>
      </li>
      <li v-if="page+3 < models.pagesCount" class="page-item"><span class="page-link">...</span></li>
      <li
          class="page-item"
          :class="{ 'disabled': page+1 > models.pagesCount }"
          @click="pageCount(page+1)"
      >
        <a class="page-link" href="#">Следующая</a>
      </li>
    </ul>
  </nav>
  <ModalEditComponent
      ref="modal"
      :title="modalTitle"
      :params="modalParams"
      :page="this.page"
      :method="setModel"
  />
  <ModalDeleteComponent
      ref="modalDelete"
      :title="modalTitle"
      :method="deleteModel"
      :modelId="modalParams.id"
  />
</template>

<script>
import {mapGetters} from "vuex";
import LoadComponent from "@/components/LoadComponent";
import ModalEditComponent from "@/components/ModalEditComponent";
import ModalDeleteComponent from "@/components/ModalDeleteComponent";
import repository from "@/api/repository";

export default {
  name: "TableComponent",
  components: {ModalDeleteComponent, ModalEditComponent, LoadComponent},
  computed: {
    ...mapGetters({
      models: 'modelsNoteAll',
      authenticated: 'authenticated',
      userMe: 'profileMe'
    }),
  },

  data() {
    return {
      page: 1,
      loading: false,
      modalTitle: '',
      isRightEdit: false,
      isRightDelete: false,
      isRightAdd: false,
      modalParams: {
        name: '',
        id: 0,
        brand: {
          id: 0,
          name: ''
        },
        attributes: {
          color: '',
          steering_position: ''
        }
      }
    }
  },

  methods: {
    async getModels() {
      this.loading = true;
      try {
        await this.$store.dispatch('getModelsNoteAll', this.page).catch(response => {
          this.makeToast(response)
        })
      } catch (data) {
        this.error.errorMassage = data;

        this.makeToast(this.error.errorMassage);
      } finally {
        this.loading = false;
      }
    },

    makeToast(message) {
      console.log(message)
    },

    pageCount(page) {
      if (page <= 0) {
        this.page = 1
      } else if (page > this.models.pagesCount) {
        this.page = this.models.pagesCount
      } else {
        this.page = page
      }
      this.getModels()
    },

    edit(id) {
      console.log(id)
    },

    showModal(title, item) {
      this.modalTitle = title
      if (item) {
        this.modalParams = item
      } else {
        this.modalParams = {
          name: '',
          id: 0,
          brand: {
            id: 0,
            name: ''
          },
          attributes: {
            color: '',
            steering_position: ''
          }
        }
      }
    },

    async setModel(params) {
      this.loading = true;
      try {
        if (params.id !== 0) {
          await this.$store.dispatch('setModelForId', params).then(() => {
            this.$store.dispatch('getModelsNoteAll', this.page).catch(response => {
              console.log(response)
            })
          }).catch(response => {
            console.log(response)
          })
        } else {
          await repository.addModel(params).then(() => {
            this.$store.dispatch('getModelsNoteAll', this.page)
          }).catch(response => {
            console.log(response)
          });
        }

      } catch (data) {
        console.log(data)
      } finally {
        this.loading = false;
      }
    },

    async deleteModel(modelId) {
      this.loading = true;
      try {
        await repository.deleteModelForId(modelId).then(() => {
          this.$store.dispatch('getModelsNoteAll', this.page)
        });
      } catch (data) {
        console.log(data)
      } finally {
        this.loading = false;
      }
    },
    right(rights) {
      let result = false;
      this.userMe.roles.forEach((right) => {
        if (rights.includes(right)) {
          result = true
        }
      })
      return result
    }
  },
  watch: {
    'userMe': {
      handler() {
        this.isRightEdit = this.right(['ROLE_MANAGER', 'ROLE_ADMIN'])
        this.isRightDelete = this.right(['ROLE_ADMIN'])
        this.isRightAdd = this.right(['ROLE_ADMIN'])
      },
      immediate: true
    }
  },

  mounted() {
    this.getModels();
  },
}
</script>

<style scoped>

</style>