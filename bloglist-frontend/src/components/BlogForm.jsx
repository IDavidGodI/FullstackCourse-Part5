import {useState} from "react"

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const NewBlog = async (event) => {
    event.preventDefault();

    const success = await createBlog({title, author, url});

    if (success){
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <div>
      <h2>New blog</h2>
      <form onSubmit={NewBlog}>
        <div>
          <input 
            type="text" name="title" placeholder="TITLE"
            value={ title }
            onChange = { ({target}) => setTitle(target.value) }
          />
        </div>
        <div>
          <input 
            type="text" name="author" placeholder="AUTHOR"
            value={ author }
            onChange = { ({target}) => setAuthor(target.value) }
          />
        </div>
        <div>
          <input 
            type="text" name="url" placeholder="URL"
            value={ url }
            onChange = { ({target}) => setUrl(target.value) }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm;