export default {
    name: 'radioChannel',
    title: 'Radio Channel',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        // options: {
        //   source: 'name',
        //   maxLength: 96,
        // },
        options: {
          source: (doc, options) => options.parent.title,
        }
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'radioJarID',
        title: 'Radio Jar ID',
        type: 'string',
      },
      {
        name: 'telegramDiscussionLink',
        title: 'Telegram Discussion Link',
        type: 'url',
      },
      {
        name: 'program',
        title: 'Program',
        // type: 'text',
        type: 'array', 
        description: `please add a line break after each end`,
        of: [{type: 'block'}]
      },
      {
        name: 'backgroundMedium',
        title: 'Background Medium',
        type: 'string',
        options: {
              list: [
                    {
                      title: "FILE: video", 
                      value: "videoFile"
                    },
                    {
                        title: "FILE: gif / png / jpeg / png", 
                        value: "bitmapFile"
                    },
                    {
                        title: "LINK: youtube video", 
                        value: "videoLinkYoutube"
                    },
                    {
                        title: "LINK: gif / png / jpeg / png", 
                        value: "bitmapLink"
                    },
                ],
        }
      },
      {
        name: 'videoFile',
        type: 'file',
        title: 'Video File',
        value: "videoFile",
        hidden: ({document}) => (document?.backgroundMedium != "videoFile")
      },
      {
        name: 'bitmapFile',
        type: 'file',
        title: 'Bitmap File',
        value: "bitmapFile",
        hidden: ({document}) => (document?.backgroundMedium != "bitmapFile")
      },
      {
        name: 'videoLinkYoutube',
        type: 'url',
        title: 'Youtube Link',
        value: "videoLinkYoutube",
        hidden: ({document}) => (document?.backgroundMedium != "videoLinkYoutube")
      },
      {
        name: 'bitmapLink',
        type: 'url',
        title: 'Bitmap Link',
        value: "bitmapLink",
        hidden: ({document}) => (document?.backgroundMedium != "bitmapLink")
      },
    ],
  }
  