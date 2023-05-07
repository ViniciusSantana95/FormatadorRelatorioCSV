# FormatadorRelatorioCSV

Essa aplicação foi desenvolvida com o intuito de auxilitar na formatação de relatórios csv importados do SISREG.

SISREG é um site do ministério da saúde onde permite a liberação de guias de exames e consultas de pacientes SUS. Porém o relatório que ele gera para acompanhamento possuí muitos dados "desnecessários", com isso desenvolvi essa aplicação para facilitar a exclusão de colunas que não são úteis, e exportação de um novo CSV com os dados formatados. O CSV importado é jogado em tabela, cada cabeçalho ao ser clicado ordena os dados em ordem decrescente e crescente. Além disso ao exportar o novo CSV, ele veirfica se a linha contém a informação CONFIRMADO, com isso facilita para quem for usar, não ter que ficar filtrando e excluindo manualmente.
