import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"


test("The form calls the event handler it received as props with the right details", async () => {
  const createBlog = jest.fn();

  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog}/>)


  const titleInput = screen.getByPlaceholderText("TITLE")
  const authorInput = screen.getByPlaceholderText("AUTHOR")
  const urlInput = screen.getByPlaceholderText("URL")

  const submitButton = screen.getByText("create");

  await user.type(titleInput, "Testing title input")
  await user.type(authorInput, "Testing author input")
  await user.type(urlInput, "Testing url input")

  await user.click(submitButton)

  const passedBlogInfo = createBlog.mock.calls[0][0];
  
  expect(passedBlogInfo.title).toBe("Testing title input")
  expect(passedBlogInfo.author).toBe("Testing author input")
  expect(passedBlogInfo.url).toBe("Testing url input")
})