export function socketData(dataJson: any) {
  try {
    if (dataJson.hasOwnProperty('uid') && dataJson.hasOwnProperty('hwid')) {
      // console.log(dataJson);
      return dataJson;
    } else {
      console.log('Dados recebidos não contêm HWID ou uid.');
    }
  } catch (error) {
    console.error('Erro ao analisar os dados recebidos como JSON:', error);
  }
}

export function isValidJSON(jsonString: any) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}
