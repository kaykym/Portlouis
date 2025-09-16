const { createApp, ref, onMounted } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

class ContactService {
  async getContatos() {
    const res = await fetch("/api");
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Erro ao carregar contatos");
    }
  }

  async createContato(contato) {
    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contato),
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Erro ao salvar contato ou contato já existe");
    }
  }

  async updateContato(id, contato) {
    const res = await fetch(`/api/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contato),
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Erro ao atualizar contato");
    }
  }

  async deleteContato(id) {
    const res = await fetch(`/api/${id}`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error("Erro ao excluir contato");
    }
  }
}

const contactService = new ContactService();

const app = createApp({
  setup() {
    const contatos = ref([]);
    const abrirModalCriar = ref(false);
    const abrirModalEditar = ref(false);

    const novoContato = ref({ nome: "", telefone: "" });
    const contatoEditando = ref({ id: null, nome: "", telefone: "" });

    const carregarContatos = async () => {
      try {
        contatos.value = await contactService.getContatos();
        console.log("Contatos carregados:", contatos.value);
      } catch (error) {
        console.error("Erro ao carregar contatos:", error);
      }
    };

    onMounted(() => {
      carregarContatos();
    });

    const validarContato = (contato) => {
      const nomeValido =
        contato.nome.trim().split(" ").length >= 2 &&
        contato.nome.split(" ").every((p) => p.length >= 3);
      const telefoneValido = /^\(\d{2}\)\s\d{4}-\d{4}$/.test(contato.telefone);
      return nomeValido && telefoneValido;
    };

    const salvarContato = async () => {
      try {
        const contatoCriado = await contactService.createContato(novoContato.value);
        contatos.value.push(contatoCriado);
        novoContato.value = { nome: "", telefone: "" };
        abrirModalCriar.value = false;
      } catch (error) {
        alert(error.message || "Erro ao salvar contato");
        console.error("Erro ao salvar contato:", error);
      }
    };

    const editar = (contato) => {
      contatoEditando.value = { ...contato };
      abrirModalEditar.value = true;
    };

    const atualizarContato = async () => {
      try {
        const contatoAtualizado = await contactService.updateContato(contatoEditando.value.id, {
          nome: contatoEditando.value.nome,
          telefone: contatoEditando.value.telefone,
        });
        const idx = contatos.value.findIndex(
          (c) => c.id === contatoAtualizado.id
        );
        if (idx !== -1) contatos.value[idx] = contatoAtualizado;
        abrirModalEditar.value = false;
      } catch (error) {
        alert(error.message || "Erro ao atualizar contato");
        console.error("Erro ao atualizar contato:", error);
      }
    };

    const excluir = async (id) => {
      try {
        await contactService.deleteContato(id);
        contatos.value = contatos.value.filter((c) => c.id !== id);
      } catch (error) {
        console.error("Erro ao excluir contato:", error);
      }
    };

    return {
      contatos,
      abrirModalCriar,
      abrirModalEditar,
      novoContato,
      contatoEditando,
      validarContato,
      salvarContato,
      editar,
      atualizarContato,
      excluir,
    };
  },
});

app.use(vuetify);
app.mount("#app");
