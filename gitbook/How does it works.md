# How (maybe) does it work
(or how I think it should work)

This is just an idea of how I would implement this if i had to. Is based on a few conversations with [Ivo](https://twitter.com/ivoriginal) and a few google results around the product.

**Explanation:**
Obsidian app creates some hidden files that assign IDs to pages and blocks, so when you link somenthing, it creat8518a3es an internal link `[Page Name](obsidian://node#nodeID)` and the app intercept the requests, or transform them in the interface into something that the app understands.

*For the graph:* ^example-name

It also creates an index of the pages and links (maybe in a json file)notenote that powers the graph. It would be way more efficent in large text collections (i.e. a library) than reading (on load) each file, and creating the graph data on the fly (maybe on app start), keeping the connections in-memory.

---
Well, this was my idea of how this app is made. I've been using this to create this file, so I'm about to use it a little bit more. I will document, on the go, whatever I've discovered on the folder `post-research`.


