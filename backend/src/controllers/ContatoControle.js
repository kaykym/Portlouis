import Contato from "../models/Contato.js";

class ContatoController {
  async criarContato(req, res) {
    try {
      const { nome, telefone } = req.body;

      if (!nome || !telefone) {
        return res.status(400).json({ error: "Nome e telefone são obrigatórios" });
      }

      const partesNome = nome.trim().split(" ");
      if (partesNome.length < 2 || partesNome.some(p => p.length < 3)) {
        return res.status(400).json({ error: "Nome deve ter pelo menos duas palavras com 3 letras cada" });
      }

      const telefoneRegex = /^\(\d{2}\)\s\d{4}-\d{4}$/;
      if (!telefoneRegex.test(telefone)) {
        return res.status(400).json({ error: "Telefone deve estar no formato (xx) xxxx-xxxx ou (xx) xxxxx-xxxx" });
      }

      
      const telefoneExistente = await Contato.findOne({ where: { telefone } });
      if (telefoneExistente) {
        return res.status(400).json({ error: "Telefone já cadastrado" });
      }

      const novoContato = await Contato.create({ nome, telefone });
      return res.status(201).json(novoContato);

    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: "Telefone já cadastrado" });
      }
      console.error("Erro ao criar contato:", error);
      res.status(500).json({ error: "Erro ao criar contato" });
    }
  }

  async listarContatos(req, res) {
    try {
      const contatos = await Contato.findAll();
      return res.status(200).json(contatos);
    } catch (error) {
      console.error("Erro ao listar contatos:", error);
      res.status(500).json({ error: "Erro ao listar contatos" });
    }
  }

  async atualizarContato(req, res) {
    try {
      const { id } = req.params;
      const { nome, telefone } = req.body;

      const contato = await Contato.findByPk(id);
      if (!contato) {
        return res.status(404).json({ error: "Contato não encontrado" });
      }

      if (nome) {
        const partesNome = nome.trim().split(" ");
        if (partesNome.length < 2 || partesNome.some(p => p.length < 3)) {
          return res.status(400).json({ error: "Nome deve ter pelo menos duas palavras com 3 letras cada" });
        }
      }

      if (telefone) {
        const telefoneRegex = /^\(\d{2}\)\s\d{4}-\d{4}$/;
        if (!telefoneRegex.test(telefone)) {
          return res.status(400).json({ error: "Telefone deve estar no formato (xx) xxxxx-xxxx" });
        }
        // Check for duplicate telefone before updating
        const telefoneExistente = await Contato.findOne({ where: { telefone } });
        if (telefoneExistente && telefoneExistente.id !== contato.id) {
          return res.status(400).json({ error: "Telefone já cadastrado" });
        }
      }

      await contato.update({ nome, telefone });
      return res.status(200).json(contato);

    } catch (error) {
      console.error("Erro ao atualizar contato:", error);
      res.status(500).json({ error: "Erro ao atualizar contato" });
    }
  }

  async deletarContato(req, res) {
    try {
      const { id } = req.params;

      const contato = await Contato.findByPk(id);
      if (!contato) {
        return res.status(404).json({ error: "Contato não encontrado" });
      }

      await contato.destroy();
      return res.status(204).send();

    } catch (error) {
      console.error("Erro ao excluir contato:", error);
      res.status(500).json({ error: "Erro ao excluir contato" });
    }
  }
}

export default new ContatoController();
