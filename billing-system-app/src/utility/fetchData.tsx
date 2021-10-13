export async function getAllTransactions(): Promise<billingSystem.TransactionType[]> 
{
  const result = await fetch("http://localhost:3001/api/getAllTransactions");
  return ((await result.json()) as any).transactions;
}


export async function createNewTransaction(transaction:billingSystem.TransactionType){
  const response= await fetch("http://localhost:3001/api/newTransaction",{
    method:"POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(transaction)
  })

  if(response?.ok) return true;
  return false;

}