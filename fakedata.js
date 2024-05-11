const apiUrl = 'http://localhost:3000/peripherical';

// Função para gerar um status aleatório entre "Normal" e "Critico"
function getRandomStatus() {
  return Math.random() < 0.5 ? 'Normal' : 'Critico';
}

// Função para gerar um host aleatório entre "NTB", "PC" e "PHN"
function getRandomHost(i) {
  const hosts = ['NTB', 'PC', 'PHN'];
  console.log(hosts[Math.floor(Math.random() * hosts.length)] + ' - ' + i);
  return hosts[Math.floor(Math.random() * hosts.length)] + ' - ' + i;
}

// Função para gerar uma classe aleatória entre "Teclado", "Mouse" e "Monitor"
function getRandomClass() {
  const classes = ['Teclado', 'Mouse', 'Monitor', 'Fone'];
  return classes[Math.floor(Math.random() * classes.length)];
}

function randomSample() {
  const perifericos = [
    'Razer DeathAdder Elite',
    'Razer BlackWidow Elite',
    'Logitech G502 HERO',
    'Logitech G Pro X Mechanical Gaming Keyboard',
    'Corsair Ironclaw RGB',
    'Corsair K95 RGB Platinum XT',
    'SteelSeries Rival 600',
    'SteelSeries Apex Pro',
    'HyperX Pulsefire Surge RGB',
    'HyperX Alloy FPS Pro Mechanical Gaming Keyboard',
    'ASUS ROG Gladius II',
    'ASUS ROG Strix Flare',
    'MSI Clutch GM70',
    'MSI Vigor GK70',
    'Redragon M602 RGB',
    'Redragon K552 Mechanical Gaming Keyboard',
    'Gigabyte AORUS M5',
    'Gigabyte AORUS K9 Optical',
    'Dell Alienware Elite Gaming Mouse',
    'Dell Alienware Pro Gaming Keyboard AW768',
  ];
  return perifericos[Math.floor(Math.random() * perifericos.length)];
}

// Função para gerar um local aleatório
function getRandomLocal() {
  const locals = [
    'Sala de Reuniões',
    '1º Andar',
    '2º Andar',
    '3º Andar',
    'Recepção',
    'Cozinha',
  ];
  return locals[Math.floor(Math.random() * locals.length)];
}

// Array com 15 nomes aleatórios de pessoas
const people = [
  'Fernanda Oliveira',
  'Rafael Silva',
  'Amanda Santos',
  'Carlos Souza',
  'Juliana Lima',
  'Thiago Oliveira',
  'Maria Silva',
  'Pedro Santos',
  'Camila Souza',
  'Lucas Lima',
  'Isabela Oliveira',
  'Matheus Silva',
  'Ana Santos',
  'Gustavo Souza',
  'Laura Lima',
];

// Função para gerar um nome aleatório de pessoa
function getRandomPerson() {
  return people[Math.floor(Math.random() * people.length)];
}

// Função para gerar um fabricante aleatório
function getRandomManufacturer() {
  const manufacturers = ['Asus', 'Gigabyte', 'Microsoft', 'Dell', 'Lenovo'];
  return manufacturers[Math.floor(Math.random() * manufacturers.length)];
}

// Função para gerar um SO aleatório
function getRandomSO() {
  const sos = ['Linux Ubuntu', 'Windows 11', 'Windows 10', 'Linux Pop OS'];
  return sos[Math.floor(Math.random() * sos.length)];
}

// Função para gerar um departamento aleatório
function getRandomDepartment() {
  const departments = ['Financeiro', 'RH', 'Comunicação', 'Marketing', 'TI'];
  return departments[Math.floor(Math.random() * departments.length)];
}

// Função para gerar um patrimônio aleatório
function getRandomPatrimony() {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

// Função para gerar uma data de garantia aleatória
function getRandomWarrantyDate() {
  const startDate = new Date(2022, 0, 1); // 1 de janeiro de 2022
  const endDate = new Date(2025, 11, 31); // 31 de dezembro de 2025
  const randomDate = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime()),
  );
  return randomDate.toISOString().split('T')[0]; // Retorna a data no formato 'YYYY-MM-DD'
}

// Função para gerar um número de NFE aleatório
function getRandomNFE() {
  return Math.random().toString(36).substring(2, 5).toUpperCase();
}

// Função para gerar uma categoria aleatória
function getRandomCategory() {
  const categories = ['Periféricos', 'Máquinas', 'Equipamentos'];
  return categories[Math.floor(Math.random() * categories.length)];
}

// Função para gerar um preço de compra aleatório
function getRandomPurchasePrice() {
  return (Math.floor(Math.random() * 10000) / 100).toFixed(2);
}

// Função para gerar uma referência de host aleatória
function getRandomHostRef() {
  return Math.random().toString(36).substring(2, 20);
}

// Loop para criar e enviar os dados
for (let i = 0; i < 5; i++) {
  const data = {
    status: getRandomStatus(),
    host: getRandomHost(i),
    class: getRandomClass(),
    local: getRandomLocal(),
    person: getRandomPerson(),
    manufacturer: getRandomManufacturer(),
    sample: randomSample(),
    so: getRandomSO(),
    department: [getRandomDepartment()],
    patrimony: getRandomPatrimony(),
    date_warranty: getRandomWarrantyDate(),
    nfe: getRandomNFE(),
    category: [getRandomCategory()],
    purchase_price: parseFloat(getRandomPurchasePrice()),
    host_ref: getRandomHostRef(),
  };

  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        console.log(`Data posted successfully for ${data.host}`);
      } else {
        console.error(
          `Failed to post data for ${data.host}: ${response.status} ${response.statusText}`,
        );
      }
    })
    .catch((error) => {
      console.error(`Failed to post data for ${data.host}: ${error.message}`);
    });
}
