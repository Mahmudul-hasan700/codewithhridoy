// lib/sanity/schemas/comments.js

export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }] 
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string'
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text'
    },
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Check to approve the comment',
      initialValue: false 
    }
  ]
};