const errorMessage = 400;

const nameValidate = (req, res, next) => {
    const { name } = req.body;
  
    if (!name) {
      return res
        .status(errorMessage)
        .json({ message: 'O campo "name" é obrigatório' }); 
    }
  
    if (name.length < 3) {
      return res
        .status(errorMessage)
        .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
    }
  
    next();
  };

const ageValidate = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res
      .status(errorMessage)
      .json({ message: 'O campo "age" é obrigatório' }); 
  }

  if (Number(age) < 18) {
    return res
      .status(errorMessage)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' }); 
  }

  next();
};

const rateValidate = (req, res, next) => {
    const { talk: { rate } } = req.body;
  
    if (!rate) {
      return res.status(errorMessage)
        .json({ message: 'O campo "rate" é obrigatório' }); 
    }
  
    if (rate < 1 || rate > 5) {
      return res.status(errorMessage)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
  
    next();
  };

  const talkValidate = (req, res, next) => {
    const { talk } = req.body;
  
    if (!talk) {
      return res.status(errorMessage).json({ message: 'O campo "talk" é obrigatório' }); 
    }
  
    next();
  };

const watchedAtValidate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) {
    return res.status(errorMessage)
      .json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }

  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

 if (!dateRegex.test(watchedAt)) {
   return res.status(400)
   .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  next();
 };

module.exports = { nameValidate,
    ageValidate,
    talkValidate,
    watchedAtValidate,
    rateValidate,
    authenticate,
};