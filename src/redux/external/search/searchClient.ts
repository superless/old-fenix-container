var AzureSearch = require('azure-search');

export function searchClient(url: string, key: string)  {
  return AzureSearch({
    url,
    key,
    version: "2019-05-06"
  });
}