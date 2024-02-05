import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"


test("Only the basic blog info is displayed", () => {
  const blog = {
    title: "Test blog",
    author: "Blog Tester",
    url: "test-blog.com",
    likes: 5
  }

  render(<Blog blog={blog} />)
  screen.debug();
  const title = screen.getByText("Test blog", { exact: false })
  const author = screen.getByText("Blog Tester", { exact: false })
  const url = screen.queryByText("test-blog.com")
  const likes = screen.queryByText("5 likes")

  expect(title).toBeDefined()
  expect(author).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})

test("When button is clicked url and likes are rendered to the screen", async () => {
  const blog = {
    title: "Test blog",
    author: "Blog Tester",
    url: "test-blog.com",
    likes: 5,
    user: {
      username: "blogTester",
      name: "T"
    }
  }

  render(<Blog

    blog={blog}
    user = {{
      username: "blogTester",
      name: "T"
    }}

  />)
  const user = userEvent.setup();

  const button = screen.getByText("view")

  await user.click(button)

  screen.debug()

  const url = screen.queryByText("test-blog.com")
  const likes = screen.queryByText("5 likes")

  
  expect(url).toBeDefined()
  expect(likes).toBeDefined()
})

test("Event handler is called when button is clicked", async () => {

  const blog = {
    title: "Test blog",
    author: "Blog Tester",
    url: "test-blog.com",
    likes: 5,
    user: {
      username: "blogTester",
      name: "T"
    }
  }

  const likeFn = jest.fn();

  render(<Blog

    blog={blog}
    user = {{
      username: "blogTester",
      name: "T"
    }}
    
    addLike={likeFn}

  />)
  const user = userEvent.setup();

  const viewButton = screen.getByText("view")

  await user.click(viewButton)

  const likeButton = screen.getByText("like")

  await user.click(likeButton)
  await user.click(likeButton)

  expect(likeFn.mock.calls).toHaveLength(2)
})