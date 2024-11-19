export async function predictReview(BeerReview) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
        method: 'POST',
        body: JSON.stringify(BeerReview),
        headers: {
          'content-type': 'application/json',
        },
      });
    
      const data = await res.json();
    
      if (res.status === 200) {
        return data;
      } else {
        throw new Error(data.message);
      }
}