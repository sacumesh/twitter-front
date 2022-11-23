import { AbiItem } from 'web3-utils';

export const abi: AbiItem[] = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_content',
        type: 'string',
      },
    ],
    name: 'createTweet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
    ],
    name: 'deleteTweet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getTweets',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
          {
            internalType: 'address',
            name: 'author',
            type: 'address',
          },
          {
            internalType: 'string',
            name: 'content',
            type: 'string',
          },
          {
            internalType: 'enum Twitter.TweetStatus',
            name: 'status',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256',
          },
        ],
        internalType: 'struct Twitter.Tweet[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'tweetCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'tweets',
    outputs: [
      {
        internalType: 'uint256',
        name: 'id',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'author',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'content',
        type: 'string',
      },
      {
        internalType: 'enum Twitter.TweetStatus',
        name: 'status',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_content',
        type: 'string',
      },
    ],
    name: 'updateTweet',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

// [
//   {
//     inputs: [
//       {
//         internalType: 'string',
//         name: '_content',
//         type: 'string',
//       },
//     ],
//     name: 'createTweet',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: '_id',
//         type: 'uint256',
//       },
//     ],
//     name: 'getTweet',
//     outputs: [
//       {
//         internalType: 'address',
//         name: '',
//         type: 'address',
//       },
//       {
//         internalType: 'string',
//         name: '',
//         type: 'string',
//       },
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//       {
//         internalType: 'uint256',
//         name: '',
//         type: 'uint256',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [],
//     name: 'getTweets',
//     outputs: [
//       {
//         internalType: 'address[]',
//         name: '',
//         type: 'address[]',
//       },
//       {
//         internalType: 'string[]',
//         name: '',
//         type: 'string[]',
//       },
//       {
//         internalType: 'uint256[]',
//         name: '',
//         type: 'uint256[]',
//       },
//       {
//         internalType: 'uint256[]',
//         name: '',
//         type: 'uint256[]',
//       },
//     ],
//     stateMutability: 'view',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: '_id',
//         type: 'uint256',
//       },
//       {
//         internalType: 'string',
//         name: '_newContent',
//         type: 'string',
//       },
//     ],
//     name: 'updateTweet',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
//   {
//     inputs: [
//       {
//         internalType: 'uint256',
//         name: '_id',
//         type: 'uint256',
//       },
//     ],
//     name: 'deleteTweet',
//     outputs: [],
//     stateMutability: 'nonpayable',
//     type: 'function',
//   },
// ];
