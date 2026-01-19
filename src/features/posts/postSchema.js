
export const postSchema = {
  type: 'object',
  properties: {
    title: { 
        type: 'string',
        minLength: 5
     },
    body: { 
        type: 'string',
        minLength: 10
     },
  },
};

