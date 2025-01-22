export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: Rule => Rule.required().min(3).max(50)
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: Rule => Rule.required().max(300)
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: Rule => Rule.required().positive()
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            { title: 'Korean Style', value: 'korean-style' },
            { title: 'Western Clothes', value: 'western-clothes' },
            { title: 'Old Money Fashion', value: 'old-money-fashion' },
          ],
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        },
      },
      {
        name: 'stock',
        title: 'Stock',
        type: 'number',
        validation: Rule => Rule.required().min(0),
      },
      {
        name: 'sizes',
        title: 'Sizes',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          list: [
            { title: 'Small', value: 'S' },
            { title: 'Medium', value: 'M' },
            { title: 'Large', value: 'L' },
            { title: 'Extra Large', value: 'XL' },
          ],
        },
        validation: Rule => Rule.required().min(1)
      },
      {
        name: 'createdAt',
        title: 'Created At',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
      },
    ],
  };
  