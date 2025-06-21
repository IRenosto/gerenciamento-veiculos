import { RequestHandler } from 'express';
import { getMakes, getModels } from 'car-info';

export const validarVeiculo: RequestHandler = async (req, res, next) => {
  const { placa, marca, modelo, ano } = req.body;

  const regexPlaca = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/;
  if (placa) {
      if (!regexPlaca.test(placa.toUpperCase())) {
        return res.status(400).json({ message:'Placa inválida (formato esperado: ABC1234 ou ABC1D23).'});
      }
  }

  if (ano){
    const anoAtual = new Date().getFullYear();
    if (ano < 1900 || ano > anoAtual) {
      return res.status(400).json({ message:`Ano inválido (${ano}). Deve estar entre 1900 e ${anoAtual}.`});
    }
  }

   if (!marca && modelo || marca && !modelo) {
    return res.status(400).json({ message: 'Marca e Modelo devem ser enviados juntos' });
  }

  if (marca){
    req.body.marca = capitalize(marca);
    const marcas = getMakes();
    if (!marcas.includes(req.body.marca)) {
      return res.status(400).json({ message:`Marca "${marca}" não encontrada.`});
    }

    const modelos = getModels(req.body.marca);
    if (modelo) {
      req.body.modelo = capitalize(modelo)
      if (!modelos.includes(req.body.modelo)) {
        return res.status(400).json({ message:`Modelo "${modelo}" não encontrado para a marca "${marca}".`});
      }
    }
  }

    next();
};

const capitalize = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};