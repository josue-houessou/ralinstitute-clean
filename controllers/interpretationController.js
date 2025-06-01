// Contrôleur pour soumettre une demande d'interprétation
exports.submitRequest = (req, res) => {
  const requestData = req.body;

  // Pour le moment, on va juste afficher les données reçues
  console.log('Nouvelle demande reçue :', requestData);

  // Répondre au client
  res.status(201).json({ message: 'Demande d\'interprétation soumise avec succès', data: requestData });
};

// Contrôleur pour obtenir toutes les demandes (simulé ici)
exports.getRequests = (req, res) => {
  // Exemple de réponse statique (à remplacer plus tard avec une base de données)
  const fakeData = [
    { id: 1, name: 'John Doe', language: 'Français - Anglais', date: '2024-04-15' },
    { id: 2, name: 'Jane Smith', language: 'Anglais - Espagnol', date: '2024-04-16' }
  ];

  res.status(200).json({ requests: fakeData });
};
