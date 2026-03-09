import type { Comment } from "../types/comment";

const now = Date.now();
const ago = (ms: number) => new Date(now - ms).toISOString();

export const initialComments: Comment[] = [
  {
    id: 1,
    post_id: 101,
    parent_id: null,
    created_at: ago(1000 * 60 * 60 * 22),
    content:
      "In the next panel Kisame actually complains that Itachi didn't fight.\n\nKisame is just a hard counter to people who rely on ninjutsu.",
    upvotes: 511,
    downvotes: 0,
    user_vote: 0,
    author: { username: "theapro" },
    replies: [
      {
        id: 2,
        post_id: 101,
        parent_id: 1,
        created_at: ago(1000 * 60 * 60 * 21),
        content:
          "Which is funny considering the 4 tails knows taijutsu.\n\nKisame is ultimately just that strong.",
        upvotes: 239,
        downvotes: 0,
        user_vote: 0,
        author: { username: "Shroomhammer" },
        replies: [
          {
            id: 3,
            post_id: 101,
            parent_id: 2,
            created_at: ago(1000 * 60 * 60 * 20),
            content:
              "He still absorbed his chakra which enhances your abilities. Lee still does stuff a ninja can do.",
            upvotes: 6,
            downvotes: 0,
            user_vote: 0,
            author: { username: "meurum5" },
          },
        ],
      },
      {
        id: 4,
        post_id: 101,
        parent_id: 1,
        created_at: ago(1000 * 60 * 60 * 20.5),
        content: "Low diffed bro ain't even take off his cloak lol.",
        upvotes: 16,
        downvotes: 0,
        user_vote: 0,
        author: { username: "annoyingrelieve" },
      },
    ],
  },
];
