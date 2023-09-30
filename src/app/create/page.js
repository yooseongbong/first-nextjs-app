'use client';

// import { useRouter } from "next/router";  //page router 방식
import { useRouter } from 'next/navigation'; //page navigation 방식

export default function Create() {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, body }),
        };

        fetch(`http://localhost:9999/topics`, options)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastid = result.id;
            router.refresh();
            router.push(`/read/${lastid}`);
          });
      }}
    >
      <p>
        <input type='text' placeholder='title' name='title' />
      </p>
      <p>
        <textarea name='body' placeholder='body'></textarea>
      </p>
      <p>
        <input type='submit' value='create' />
      </p>
    </form>
  );
}
