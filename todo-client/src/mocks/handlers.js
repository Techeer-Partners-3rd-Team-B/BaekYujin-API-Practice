import { rest } from "msw";

const id = 1;

export const handlers = [
  // 테스트 mock api
  rest.get("api/todos", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        todos: [
          {
            id: 1,
            title: "todo 1",
            done: false,
            thumbnail:
              "https://i.namu.wiki/i/f0cH4ggbrkBHYMHthSXCNCcp-F3CHc_9lZVqk9dx5DimnlPfDXSJjEg5V7RJ9plvu7jEgdDqy3dmA10J9acqpQ.webp",
          },
          {
            id: 2,
            title: "todo 2",
            done: true,
            thumbnail:
              "https://i.namu.wiki/i/08M04NyBg4uzZERJF_0_HSUXCad9XUM9cNiLsVbjvYa0MawCbdcAlN2Nt-VZEFrcFeDqP0JfeRU2Ha6mB2LRKA.webp",
          },
          {
            id: 3,
            title: "todo 3",
            done: false,
            thumbnail:
              "https://i.namu.wiki/i/UhKnN-Ugtlgpdb1e_vWVDeSqsFjONLbpwPKSQHpQvpqsH-2AqXXyqEY7P4OVe1fvr4CsAwj_lVWzn_wgcVJiMA.svg",
          },
        ],
      })
    );
  }),

  rest.put(`api/todos/${id}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        title: "todo 1",
        done: true,
        thumbnail:
          "https://i.namu.wiki/i/f0cH4ggbrkBHYMHthSXCNCcp-F3CHc_9lZVqk9dx5DimnlPfDXSJjEg5V7RJ9plvu7jEgdDqy3dmA10J9acqpQ.webp",
      })
    );
  }),

  rest.post(`api/todos`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      console.log(req),
      ctx.json({
        id: req.body.id,
        title: req.body.title,
        done: true,
        thumbnail:
          "https://i.namu.wiki/i/f0cH4ggbrkBHYMHthSXCNCcp-F3CHc_9lZVqk9dx5DimnlPfDXSJjEg5V7RJ9plvu7jEgdDqy3dmA10J9acqpQ.webp",
      })
    );
  }),
];
