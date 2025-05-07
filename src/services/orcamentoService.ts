export async function enviarOrcamento(data: any) {
    try {
      const response = await fetch('http://localhost:8080/api/v1/orcamento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
  
      if (!response.ok) {
        throw new Error('Erro ao enviar orçamento')
      }
  
      return await response.json()
    } catch (err) {
      console.error(err)
    }
  }
  