
const importarCsvButton = document.getElementById("importar-csv");
const exportarCsvButton = document.getElementById("exportar-csv");
const exportarConsultasButton = document.getElementById("exportar-consultas");
const exportarExamesButton = document.getElementById("exportar-exames");
const exportarCirurgiasButton = document.getElementById("exportar-cirurgias");
const exportarMacButton = document.getElementById("exportar-apacsMac");
const exportarFaecButton = document.getElementById("exportar-apacsFaec");
const exportarGlaucomaButton = document.getElementById("exportar-apacsGlaucoma");
const exportarMamografiaButton = document.getElementById("exportar-mamografia");
const exportarTomografiaButton = document.getElementById("exportar-tomografia");

const dadosCsvTable = document.getElementById("dados-csv");
const colunasParaRemover = [
    1,4, 5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
    23, 25, 26, 27, 28, 29, 30, 31, 32, 35, 36, 37
];

importarCsvButton.addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".csv";
    fileInput.click();
    fileInput.addEventListener("change", () => {
        const reader = new FileReader();
        reader.readAsText(fileInput.files[0]);
        reader.addEventListener("load", () => {
            const csvData = reader.result;
            const linhas = csvData.split("\n");
            const cabecalho = linhas[0].split(";");
            const novoCabecalho = cabecalho.filter((_, i) => !colunasParaRemover.includes(i));
            const novasLinhas = linhas.slice(1).map(linha => {
                const celulas = linha.split(";");
                return celulas.filter((_, i) => !colunasParaRemover.includes(i)).join(";");
            });
            const novoCsv = [novoCabecalho.join(";"), ...novasLinhas].join("\n");

            // Exibir na tela
            dadosCsvTable.style.display = "block";
            exportarCsvButton.style.display = "inline-block";
			exportarConsultasButton.style.display = "inline-block";
			exportarExamesButton.style.display = "inline-block";
			exportarCirurgiasButton.style.display = "inline-block";
			exportarMacButton.style.display = "inline-block";
			exportarFaecButton.style.display = "inline-block";
			exportarGlaucomaButton.style.display = "inline-block";
			exportarMamografiaButton.style.display = "inline-block";
			exportarTomografiaButton.style.display = "inline-block";
			
            let html = "<thead><tr>";
            novoCabecalho.forEach(coluna => {
                html += `<th>${coluna}</th>`;
            });
            html += "</tr></thead><tbody>";
            novasLinhas.forEach(linha => {
                html += "<tr>";
                const celulas = linha.split(";");
                celulas.forEach(celula => {
                    html += `<td>${celula}</td>`;
                });
                html += "</tr>";
            });
            html += "</tbody>";
            dadosCsvTable.innerHTML = html;

            // Ordenar ao clicar no cabeçalho
            const ths = dadosCsvTable.getElementsByTagName("th");
            Array.from(ths).forEach(th => {
                th.addEventListener("click", () => {
                    const index = Array.from(ths).indexOf(th);
                    const tipo = th.getAttribute("data-tipo") || "asc";
                    const novaOrdem = tipo === "asc" ? "desc" : "asc";
                    th.setAttribute("data-tipo", novaOrdem);
                    const tbody = dadosCsvTable.getElementsByTagName("tbody")[0];
                    const linhas = Array.from(tbody.getElementsByTagName("tr")).sort((a, b) => {
                        const celulaA = a.getElementsByTagName("td")[index]?.textContent;
                        const celulaB = b.getElementsByTagName("td")[index]?.textContent;

                        if (celulaA && celulaB) {
                            if (celulaA < celulaB) {
                                return tipo === "asc" ? -1 : 1;
                            } else if (celulaA > celulaB) {
                                return tipo === "asc" ? 1 : -1;
                            }
                        }
                        return 0;
                    });
                    tbody.innerHTML = "";
                    linhas.forEach(linha => tbody.appendChild(linha));
                });
            });

            //Exportar csv
            // exportarCsvButton.addEventListener("click", () => {
            //     const a = document.createElement("a");
            //     a.style.display = "none";
            //     a.href = URL.createObjectURL(new Blob([novoCsv], { type: "text/csv" }));
            //     a.download = "dados.csv";
            //     document.body.appendChild(fileInput);
            //     a.click();
            // });

            exportarCsvButton.addEventListener("click", () => {
                const rows = document.querySelectorAll("table tr");
                let csvContent = "data:text/csv;charset=utf-8,";
                
                rows.forEach(row => {
                const cols = row.querySelectorAll("td");
                const colValues = [];
                cols.forEach(col => {
                colValues.push(col.innerText);
                });
                if (colValues[7] === "CONFIRMADO") {
                csvContent += colValues.join(";") + "\r\n";
                }
                });
                
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "total.xls");
                document.body.appendChild(link);
                link.click();
			});
            

			exportarConsultasButton.addEventListener("click", () => {
				const rows = document.querySelectorAll("table tr");
				let csvContent = "data:text/csv;charset=utf-8,";
            
				rows.forEach(row => {
				const cols = row.querySelectorAll("td");
				const colValues = [];
				cols.forEach(col => {
				colValues.push(col.innerText);
				});
				if (colValues[7] === "CONFIRMADO" && colValues[1] === "0301010072"){
				csvContent += colValues.join(";") + "\r\n";
				}
				});
            
				const encodedUri = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "consultas.xls");
				document.body.appendChild(link);
				link.click();
			});

			exportarExamesButton.addEventListener("click", () => {
				const rows = document.querySelectorAll("table tr");
				let csvContent = "data:text/csv;charset=utf-8,";
            
				rows.forEach(row => {
				const cols = row.querySelectorAll("td");
				const colValues = [];
				cols.forEach(col => {
				colValues.push(col.innerText);
				});
				if (colValues[7] === "CONFIRMADO" && (colValues[1] === "0211060011" || colValues[1] === "0211060020"
				 || colValues[1] === "0211060038" || colValues[1] === "0211060054" || colValues[1] === "0211060100"
				 || colValues[1] === "0405050178" || colValues[1] === "0211060127" || colValues[1] === "0211060143"
				 || colValues[1] === "0205020020" || colValues[1] === "0211060178" || colValues[1] === "0211060186"
				 || colValues[1] === "0211060224" || colValues[1] === "0211060259" || colValues[1] === "0211060267"
				 || colValues[1] === "0405050364" || colValues[1] === "0205020089" || colValues[1] === "0405030223"
				 || colValues[1] === "0405030215" || colValues[1] === "0211060232" 
				)) {
				csvContent += colValues.join(";") + "\r\n";
				}
				});
            
				const encodedUri = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "exames.xls");
				document.body.appendChild(link);
				link.click();
			});
			
			exportarCirurgiasButton.addEventListener("click", () => {
				const rows = document.querySelectorAll("table tr");
				let csvContent = "data:text/csv;charset=utf-8,";
            
				rows.forEach(row => {
				const cols = row.querySelectorAll("td");
				const colValues = [];
				cols.forEach(col => {
				colValues.push(col.innerText);
				});
				if (colValues[7] === "CONFIRMADO" && ( colValues[1] === "0405050372" || colValues[1] === "0405030070"
				 || colValues[1] === "0405030142" || colValues[1] === "0405030134" || colValues[1] === "0405030177"
				 || colValues[1] === "0405030169" || colValues[1] === "0405010133" || colValues[1] === "0405050151"
				 || colValues[1] === "0405050321" || colValues[1] === "8146063" || colValues[1] === "0505010097"
				) ){

				csvContent += colValues.join(";") + "\r\n";
				}
				});
            
				const encodedUri = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "cirurgias.xls");
				document.body.appendChild(link);
				link.click();
			});
			
			exportarMacButton.addEventListener("click", () => {
				const rows = document.querySelectorAll("table tr");
				let csvContent = "data:text/csv;charset=utf-8,";
            
				rows.forEach(row => {
				const cols = row.querySelectorAll("td");
				const colValues = [];
				cols.forEach(col => {
				colValues.push(col.innerText);
				});
				if (colValues[7] === "CONFIRMADO" && (colValues[1] === "0405050020" || colValues[1] === "0405030045"
				 || colValues[1] === "0405030193" || colValues[1] === "0405050216"
				)) {
				csvContent += colValues.join(";") + "\r\n";
				}
				});
            
				const encodedUri = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "ApacsMac.xls");
				document.body.appendChild(link);
				link.click();
			});
			
			exportarFaecButton.addEventListener("click", () => {
				const rows = document.querySelectorAll("table tr");
				let csvContent = "data:text/csv;charset=utf-8,";
            
				rows.forEach(row => {
				const cols = row.querySelectorAll("td");
				const colValues = [];
				cols.forEach(col => {
				colValues.push(col.innerText);
				});
				if (colValues[7] === "CONFIRMADO" && (colValues[1] === "0211060283" || colValues[1] === "0303050233")) {
				csvContent += colValues.join(";") + "\r\n";
				}
				});
            
				const encodedUri = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "ApacsFaec.xls");
				document.body.appendChild(link);
				link.click();
			});
			
			exportarGlaucomaButton.addEventListener("click", () => {
				const rows = document.querySelectorAll("table tr");
				let csvContent = "data:text/csv;charset=utf-8,";
            
				rows.forEach(row => {
				const cols = row.querySelectorAll("td");
				const colValues = [];
				cols.forEach(col => {
				colValues.push(col.innerText);
				});
				if (colValues[7] === "CONFIRMADO" && (colValues[1] === "0301010102" || colValues[1] === "0303050012"
				 || colValues[1] === "0303050039" || colValues[1] === "0303050047" || colValues[1] === "0303050055"
				 || colValues[1] === "0303050063" || colValues[1] === "0303050071" || colValues[1] === "0303050080"
				 || colValues[1] === "0303050098" || colValues[1] === "0303050101" || colValues[1] === "0303050110"
				 || colValues[1] === "0303050152" || colValues[1] === "0303050160" || colValues[1] === "0303050179"
				 || colValues[1] === "0303050187" || colValues[1] === "0303050195" || colValues[1] === "0303050209"
				 || colValues[1] === "0303050217" || colValues[1] === "0303050225"
				)) {
				csvContent += colValues.join(";") + "\r\n";
				}
				});
            
				const encodedUri = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "Glaucoma.xls");
				document.body.appendChild(link);
				link.click();
			});
			
			exportarMamografiaButton.addEventListener("click", () => {
				const rows = document.querySelectorAll("table tr");
				let csvContent = "data:text/csv;charset=utf-8,";
            
				rows.forEach(row => {
				const cols = row.querySelectorAll("td");
				const colValues = [];
				cols.forEach(col => {
				colValues.push(col.innerText);
				});
				if (colValues[7] === "CONFIRMADO" && (colValues[1] === "0204030188" || colValues[1] === "0204030030"
				)) {
				csvContent += colValues.join(";") + "\r\n";
				}
				});
            
				const encodedUri = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "Mamografia.xls");
				document.body.appendChild(link);
				link.click();
			});
			
			exportarTomografiaButton.addEventListener("click", () => {
				const rows = document.querySelectorAll("table tr");
				let csvContent = "data:text/csv;charset=utf-8,";
            
				rows.forEach(row => {
				const cols = row.querySelectorAll("td");
				const colValues = [];
				cols.forEach(col => {
				colValues.push(col.innerText);
				});
				if (colValues[7] === "CONFIRMADO" && !(colValues[1] === "0204030188" || colValues[1] === "0204030030"
				)) {
				csvContent += colValues.join(";") + "\r\n";
				}
				});
            
				const encodedUri = encodeURI(csvContent);
				const link = document.createElement("a");
				link.setAttribute("href", encodedUri);
				link.setAttribute("download", "Tomografia.xls");
				document.body.appendChild(link);
				link.click();
			});

        });
    });
	
});
