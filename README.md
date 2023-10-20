# Image Uploader

### How to use?

    npm install
    npm run dev

### Goals

- My main goal was to ensure the end product met the mockup provided
  - Be able to upload images and ensure they are saved using the API
  - Be able to search images by name using input and API (Search by calling the API, no client side filtering)
  - List all uploaded images
  - Delete images (By calling API no client side filters)
  - Resolve any errors cause by 'noImplicitAny'

### Features

This is a SPA that allows user to view, upload, search and delete images

User is able to:

- View all the uploaded images
- See the total count of images/searched results
- Upload an image
- Search an image by name
- Delete an image

## Notes

Not having much experience with Node, my main hurdle was the mock api. I understand I could've used something like JSONplaceHolder but I saw this as an opportunity to learn something new in a timebox and build something that could work with the frontend I had planned. I initially thought of studying up on Node and building an entirely different backend but then due to time constraints decided to go with json-server.

I love working with React and CSS libraries so that part only took me about 2-3hr including trying out various design libraries etc and had a lot of fun with it

Building the mock api took majority of my time. A good amount of reading and trial and error but overall it was a good learning experience

## Future

I could see that this project could be grown into something quite big, if I had more time I would definitely focus on the following:

- Pagination (when it comes to scaling this project, I believe that'd be one of the first steps)
- Testing
- Polishing up the backend (I don't have much experience building API's so I believe I could definitely learn better practices and produce something more refined)
