import { SimpleMenuField } from '../FrameContext.types';

export const defaultSimpleMenu =
  // Simple menu field
  {
    name: 'toc_menu',
    label: 'Table of Contents',
    required: false,
    locked: false,
    type: 'simplemenu',
    default: [
      {
        isPublished: false,
        pageLinkId: null,
        pageLinkName: null,
        isDeleted: null,
        categoryId: null,
        subCategory: null,
        contentType: null,
        state: null,
        linkLabel: 'Why is product marketing important?',
        linkUrl: null,
        linkParams: null,
        linkTarget: null,
        type: 'NO_LINK',
        children: [
          {
            isPublished: false,
            pageLinkId: null,
            pageLinkName: null,
            isDeleted: null,
            categoryId: null,
            subCategory: null,
            contentType: null,
            state: null,
            linkLabel: 'Product Marketing Responsibilities',
            linkUrl: '#product-marketing-responsibilities',
            linkParams: null,
            linkTarget: null,
            type: 'URL_LINK',
            children: [],
          },
          {
            isPublished: false,
            pageLinkId: null,
            pageLinkName: null,
            isDeleted: null,
            categoryId: null,
            subCategory: null,
            contentType: null,
            state: null,
            linkLabel:
              '1. Identify the buyer personas and target audience for your product.',
            linkUrl: '#step1',
            linkParams: null,
            linkTarget: null,
            type: 'URL_LINK',
            children: [],
          },
          {
            isPublished: false,
            pageLinkId: null,
            pageLinkName: null,
            isDeleted: null,
            categoryId: null,
            subCategory: null,
            contentType: null,
            state: null,
            linkLabel:
              '2. Successfully create, manage and carry out your product marketing strategy.',
            linkUrl: '#step2',
            linkParams: null,
            linkTarget: null,
            type: 'URL_LINK',
            children: [],
          },
        ],
      },
      {
        isPublished: false,
        pageLinkId: null,
        pageLinkName: null,
        isDeleted: null,
        categoryId: null,
        subCategory: null,
        contentType: null,
        state: null,
        linkLabel: 'How HubSpot can help',
        linkUrl: 'https://hubspot.com',
        linkParams: null,
        linkTarget: null,
        type: 'URL_LINK',
        children: [],
      },
    ],
  } as SimpleMenuField;