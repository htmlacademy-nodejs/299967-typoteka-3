'use strict';

const supertest = require(`supertest`);
const {createServer} = require(`../cli/server`);

let server;

const mockPosts = [
  {
    id: `2N_TWZ`,
    title: `Как перестать беспокоиться и начать жить`,
    createdDate: `2020-6-6, 19:49:04`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.\nИ не знаю почему, когда я прочитал это письмо, мне так захотелось, чтобы и вы познакомились с этой прелестной девочкой, что я вдруг махнул рукой на свой "научный труд" и на все свои умные рассуждения и решил попробовать - только попробовать - рассказать о ней по-русски.\nПрограммировать не настолько сложно, как об этом говорят.\nИ я не посмел!\nЁлки — это не просто красивое дерево.Это прочная древесина.`,
    fullText: `Вдруг да они это знают?\nРазве можно было считать скучным человека, который умел сделать из носового платка мышь - и эта мышь бегала как живая! Человека, который из простой бумаги складывал пистолет,- и пистолет этот стрелял почти не худее настоящего! Разве можно было считать скучным такого необыкновенного выдумщика!\nАльбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.\nИ не знаю почему, когда я прочитал это письмо, мне так захотелось, чтобы и вы познакомились с этой прелестной девочкой, что я вдруг махнул рукой на свой "научный труд" и на все свои умные рассуждения и решил попробовать - только попробовать - рассказать о ней по-русски.\nИ даже немножко раньше: с названия.\nПо совести говоря, бояться нечего.\nЁлки — это не просто красивое дерево.Это прочная древесина.\nВдруг да они это знают?\nНо это, впрочем, не обязательно.\nТам ее знает каждый и любят все.\nВот дочитаете до конца, тогда узнаете! А не дочитаете - ну что ж, дело ваше.\nНо это, впрочем, не обязательно.\nИ вскоре я понял, что самое главное в книжке об Алисе - не загадки, не фокусы, не головоломки, не игра слов и даже не блистательная игра ума, а... сама Алиса.\nПравильно, Алисой!\nИ я не посмел!\nПрограммировать не настолько сложно, как об этом говорят.\nОсобенно он любил и умел играть... словами.\nСловом, со мной вышло точь-в-точь как с одной маленькой девочкой, которая обычно говорила:\nДа, да!\nПо совести говоря, бояться нечего.\nНо это, впрочем, не обязательно.`,
    categories: [
      {
        id: `ww-oGw`,
        name: `За жизнь`
      }
    ],
    comments: [
      {
        id: `y-SA31`,
        text: `Мне кажется или я уже читал это где-то?\r`
      },
      {
        id: `m1L7TK`,
        text: `Мой кот понятнее излагает.\r`
      }
    ]
  },
  {
    id: `YFBpPQ`,
    title: `Как достигнуть успеха не вставая с кресла`,
    createdDate: `2020-9-5, 17:39:03`,
    announce: `Осталось добавить совсем немножко: как получилась русская книжка, которую вы сейчас читаете, и при чем тут я.\nИ чтобы это случилось поскорее, я поскорее заканчиваю эту ГЛАВУ (вы, конечно, давно догадались, что это всего-навсего ПРЕДИСЛОВИЕ!).\nКак вдруг в один прекрасный день я прочитал письмо Льюиса Кэрролла театральному режиссеру, который решил поставить сказку про Алису на сцене.\nТам ее знает каждый и любят все.\nУгадайте!..`,
    fullText: `Там ее знает каждый и любят все.\nОсталось добавить совсем немножко: как получилась русская книжка, которую вы сейчас читаете, и при чем тут я.\nИ чтобы это случилось поскорее, я поскорее заканчиваю эту ГЛАВУ (вы, конечно, давно догадались, что это всего-навсего ПРЕДИСЛОВИЕ!).\nКак вдруг в один прекрасный день я прочитал письмо Льюиса Кэрролла театральному режиссеру, который решил поставить сказку про Алису на сцене.\nУгадайте!..`,
    categories: [
      {
        id: `ww-oGw`,
        name: `За жизнь`
      }
    ],
    comments: []
  },
  {
    id: `ydBW9N`,
    title: `Обзор новейшего смартфона`,
    createdDate: `2020-20-5, 18:54:00`,
    announce: `Тут я за вас совершенно спокоен - уверен, что смеяться вы умеете и любите!\nОсталось добавить совсем немножко: как получилась русская книжка, которую вы сейчас читаете, и при чем тут я.\nИ чтобы это случилось поскорее, я поскорее заканчиваю эту ГЛАВУ (вы, конечно, давно догадались, что это всего-навсего ПРЕДИСЛОВИЕ!).\nВот так: МОРЕ - ГОРЕ - ГОРА.\nИ вскоре я понял, что самое главное в книжке об Алисе - не загадки, не фокусы, не головоломки, не игра слов и даже не блистательная игра ума, а... сама Алиса.`,
    fullText: `Есть у меня один знакомый, приблизительно двух лет от роду, у которого огромное чувство юмора - он может захохотать, когда никому другому и в голову не придет улыбнуться.\nОсталось добавить совсем немножко: как получилась русская книжка, которую вы сейчас читаете, и при чем тут я.\nОн написал больше 30 хитов.\nТут я за вас совершенно спокоен - уверен, что смеяться вы умеете и любите!\nДа, маленькая Алиса, которую автор так любит (хоть порой и посмеивается над ней), что эта великая любовь превращает фокусы в чудеса, а фокусника - в волшебника.\nИ вскоре я понял, что самое главное в книжке об Алисе - не загадки, не фокусы, не головоломки, не игра слов и даже не блистательная игра ума, а... сама Алиса.\nЗолотое сечение — соотношение двух величин, гармоническая пропорция.\nСоветую внимательно прочитать примечания (они напечатаны мелким шрифтом) - это может кое в чем помочь.\nСоветую внимательно прочитать примечания (они напечатаны мелким шрифтом) - это может кое в чем помочь.\nНо стоило мне заикнуться об этом своем желании, как все начинали на меня страшно кричать, чтобы я не смел.\nИ чтобы это случилось поскорее, я поскорее заканчиваю эту ГЛАВУ (вы, конечно, давно догадались, что это всего-навсего ПРЕДИСЛОВИЕ!).\nВот так: МОРЕ - ГОРЕ - ГОРА.\nДа, сразу видно, что это очень и очень непростая сказка!\nДело в том, что хотя перед вами - сказка, но сказка эта очень, очень не простая.\nЭнциклопедический Словарь.\nРок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?\nЭто и не удивительно\nНачнем с начала, как советует Червонный Король (вам предстоит с ним скоро встретиться).\nИз под его пера вышло 8 платиновых альбомов.\nБольше всего на свете я ненавижу обман и люблю честность и потому сразу честно признаюсь, что я вас (совсем немножко!) обманул: на самом деле это не НИКАКАЯ ГЛАВА, а НИКАКАЯ НЕ ГЛАВА - это просто-напросто...\nНет, фокусы с грехом пополам еще получались, но что-то - может быть, самое главное - пропадало, и веселая, умная, озорная, расчудесная сказка становилась малопонятной и - страшно сказать - скучной.\nЕсли я выполнил свое обещание и вы узнали КОЕ-ЧТО, мне очень приятно.\nПомните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.\nПравильно, Алисой!`,
    categories: [
      {
        id: `ww-oGw`,
        name: `За жизнь`
      },
      {
        id: `YurTME`,
        name: `Музыка`
      }
    ],
    comments: [
      {
        id: `iLPx9M`,
        text: `Мне кажется или я уже читал это где-то?\r`
      },
      {
        id: `bakuVg`,
        text: `Я тоже могу так написать...\r`
      },
      {
        id: `Q4Et4Z`,
        text: `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.\r`
      }
    ]
  }];

const mockReducedPosts = [
  {
    id: `2N_TWZ`,
    title: `Как перестать беспокоиться и начать жить`,
    createdDate: `2020-6-6, 19:49:04`,
    announce: `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.\nИ не знаю почему, когда я прочитал это письмо, мне так захотелось, чтобы и вы познакомились с этой прелестной девочкой, что я вдруг махнул рукой на свой "научный труд" и на все свои умные рассуждения и решил попробовать - только попробовать - рассказать о ней по-русски.\nПрограммировать не настолько сложно, как об этом говорят.\nИ я не посмел!\nЁлки — это не просто красивое дерево.Это прочная древесина.`,
    categories: [
      {
        id: `ww-oGw`,
        name: `За жизнь`
      }
    ],
  },
  {
    id: `YFBpPQ`,
    title: `Как достигнуть успеха не вставая с кресла`,
    createdDate: `2020-9-5, 17:39:03`,
    announce: `Осталось добавить совсем немножко: как получилась русская книжка, которую вы сейчас читаете, и при чем тут я.\nИ чтобы это случилось поскорее, я поскорее заканчиваю эту ГЛАВУ (вы, конечно, давно догадались, что это всего-навсего ПРЕДИСЛОВИЕ!).\nКак вдруг в один прекрасный день я прочитал письмо Льюиса Кэрролла театральному режиссеру, который решил поставить сказку про Алису на сцене.\nТам ее знает каждый и любят все.\nУгадайте!..`,
    categories: [
      {
        id: `ww-oGw`,
        name: `За жизнь`
      }
    ],
  },
  {
    id: `ydBW9N`,
    title: `Обзор новейшего смартфона`,
    createdDate: `2020-20-5, 18:54:00`,
    announce: `Тут я за вас совершенно спокоен - уверен, что смеяться вы умеете и любите!\nОсталось добавить совсем немножко: как получилась русская книжка, которую вы сейчас читаете, и при чем тут я.\nИ чтобы это случилось поскорее, я поскорее заканчиваю эту ГЛАВУ (вы, конечно, давно догадались, что это всего-навсего ПРЕДИСЛОВИЕ!).\nВот так: МОРЕ - ГОРЕ - ГОРА.\nИ вскоре я понял, что самое главное в книжке об Алисе - не загадки, не фокусы, не головоломки, не игра слов и даже не блистательная игра ума, а... сама Алиса.`,
    categories: [
      {
        id: `ww-oGw`,
        name: `За жизнь`
      },
      {
        id: `YurTME`,
        name: `Музыка`
      }
    ],
  }];

const validPostData = {
  title: `Морская кадриль`,
  createdDate: `2020-4-5, 02:31:32`,
  announce: `И Андрюшенька заливается смехом.\nЛюбящая - это прежде всего: любящая и нежная; нежная, как лань, и любящая, как собака (простите мне прозаическое сравнение, но я не знаю на земле любви чище и совершенней); и еще - учтивая: вежливая и приветливая со всеми, с великими и малыми, с могучими и смешными, с королями и червяками, словно ты сама - королевская дочь в шитом золотом наряде.\nИгры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.\nНо это, впрочем, не обязательно.\nПРИСЯЖНЫЕ и чем они отличаются от ПРИСТЯЖНЫХ; и какого рода ВРЕМЯ, и курят ли червяки КАЛЬЯН, и носят ли Лягушки, Караси и Судьи ПАРИКИ, и можно ли питаться одним МАРМЕЛАДОМ и... и так далее и тому подобное!`,
  fullText: `Надо знать, кто такие АНТИПОДЫ и что такое ПАРАЛЛЕЛИ и МЕРИДИАНЫ, надо знать, КОГДА ЧТО СЛУЧИЛОСЬ и что такое ТКАНЬ ПОВЕСТВОВАНИЯ; надо знать, из чего НЕ делается ГОРЧИЦА и как правильно играть в КРОКЕТ; кто такие\nИ вскоре я понял, что самое главное в книжке об Алисе - не загадки, не фокусы, не головоломки, не игра слов и даже не блистательная игра ума, а... сама Алиса.\nИ Андрюшенька заливается смехом.\nНо это, впрочем, не обязательно.\nИ все это - выдумки, игры, загадки, головоломки, сюрпризы, пародии и фокусы,- все это есть в его сказке про девочку Алису.\nАлиса была такая девочка, которой очень трудно было отказать, потому что мистер Доджсон, хотя и был профессором математики (честное слово!) и к тому же в этот день уже сильно устал,- послушался.\nМОРЕ в ГОРУ.\nКонечно, знать ВСЕ эти вещи, по-моему, никто не может - даже Малый\nПростые ежедневные упражнения помогут достичь успеха.\nБудь моя воля, я бы ни за что не назвал так эту книжку.\nАлиса была такая девочка, которой очень трудно было отказать, потому что мистер Доджсон, хотя и был профессором математики (честное слово!) и к тому же в этот день уже сильно устал,- послушался.\nИз под его пера вышло 8 платиновых альбомов.\nОсвоить вёрстку несложно. Возьмите новую книгу и закрепите все упражнения на практике.\nЛюбящая - это прежде всего: любящая и нежная; нежная, как лань, и любящая, как собака (простите мне прозаическое сравнение, но я не знаю на земле любви чище и совершенней); и еще - учтивая: вежливая и приветливая со всеми, с великими и малыми, с могучими и смешными, с королями и червяками, словно ты сама - королевская дочь в шитом золотом наряде.\nИгры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.\nДело в том, что хотя перед вами - сказка, но сказка эта очень, очень не простая.\nИз под его пера вышло 8 платиновых альбомов.\nИ даже немножко раньше: с названия.\nПервая большая ёлка была установлена только в 1938 году.\nНо если вы ему скажете, что Ихтиозавр говорит: "Ах, батюшки мои!" -\nПРИСЯЖНЫЕ и чем они отличаются от ПРИСТЯЖНЫХ; и какого рода ВРЕМЯ, и курят ли червяки КАЛЬЯН, и носят ли Лягушки, Караси и Судьи ПАРИКИ, и можно ли питаться одним МАРМЕЛАДОМ и... и так далее и тому подобное!\nПомните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.\nВот так: МОРЕ - ГОРЕ - ГОРА.\nИ даже немножко раньше: с названия.`,
  categories: [
    {
      id: `RU7LTK`,
      name: `Без рамки`
    },
    {
      id: `LNXs7g`,
      name: `Кино`
    }
  ],
};

const invalidPostData = {
  title: `Морская кадриль`,
  createdDate: `2020-4-5, 02:31:32`,
  categories: [
    {
      id: `RU7LTK`,
      name: `Без рамки`
    },
    {
      id: `LNXs7g`,
      name: `Кино`
    }
  ],
};

beforeAll(() => {
  server = createServer(mockPosts);
});

describe(`GET requests, success response`, () => {
  it(`should return all posts if url is "/api/articles"`, async () => {
    const res = await supertest(server).get(`/api/articles`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockReducedPosts);
  });

  it(`should return one post if url is "/api/articles/2N_TWZ"`, async () => {
    const res = await supertest(server).get(`/api/articles/2N_TWZ`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPosts[0]);
  });

  it(`should return all comments if url is "/api/articles/2N_TWZ/comments"`, async () => {
    const res = await supertest(server).get(`/api/articles/2N_TWZ/comments`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockPosts[0].comments);
  });

  it(`should return an empty array if url is "/api/articles/YFBpPQ/comments" and no comments in the post`, async () => {
    const res = await supertest(server).get(`/api/articles/YFBpPQ/comments`);
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });
});

describe(`GET requests, error response`, () => {
  it(`should return 404 if url is "/api/wrong-articles"`, async () => {
    const res = await supertest(server).get(`/api/wrong-articles`);
    expect(res.status).toBe(404);
  });

  it(`should return 400 if url is "/api/articles/wrong-id"`, async () => {
    const res = await supertest(server).get(`/api/articles/wrong-id`);
    expect(res.status).toBe(400);
  });

  it(`should return 400 if url is "/api/articles/wrong-id/comments"`, async () => {
    const res = await supertest(server).get(`/api/articles/wrong-id/comments`);
    expect(res.status).toBe(400);
  });
});

describe(`POST request`, () => {
  it(`should create a new post if url is "/api/articles" and post-data are valid`, async () => {
    const res = await supertest(server).post(`/api/articles`).send(validPostData);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe(validPostData.title);

    const newId = res.body.id;
    const postResponse = await supertest(server).get(`/api/articles/${newId}`);
    expect(postResponse.status).toBe(200);
    expect(postResponse.body.title).toBe(validPostData.title);
  });

  it(`should not create a new post if url is "/api/articles" and post-data are not valid`, async () => {
    const beforePostsResponse = await supertest(server).get(`/api/articles`);
    const res = await supertest(server).post(`/api/articles`).send(invalidPostData);
    expect(res.status).toBe(400);

    const afterPpostsResponse = await supertest(server).get(`/api/articles`);
    expect(afterPpostsResponse.body.length).toEqual(beforePostsResponse.body.length);
    expect(afterPpostsResponse.body).toEqual(beforePostsResponse.body);
  });

  it(`should create a new comment if url is "/api/articles/2N_TWZ/comments" and comment data are valid`, async () => {
    const res = await supertest(server).post(`/api/articles/2N_TWZ/comments`).send({text: `A test comment`});
    const responseAfter = await supertest(server).get(`/api/articles/2N_TWZ/comments`);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty(`text`, `A test comment`);

    const comment = responseAfter.body[responseAfter.body.length - 1];
    expect(comment.text).toBe(`A test comment`);
  });

  it(`should not create a new comment if url is "/api/articles/2N_TWZ/comments" and comment data are not valid`, async () => {
    const responseBefore = await supertest(server).get(`/api/articles/2N_TWZ/comments`);
    const res = await supertest(server).post(`/api/articles/2N_TWZ/comments`).send({wrongField: `A test comment`});
    const responseAfter = await supertest(server).get(`/api/articles/2N_TWZ/comments`);
    expect(res.status).toBe(400);
    expect(responseBefore.body.length).toBe(responseAfter.body.length);
  });

  it(`should not create a new comment if url is "/api/articles/wrong-id/comments" and comment data are valid`, async () => {
    const res = await supertest(server).post(`/api/articles/wrong-id/comments`).send({text: `A test comment`});
    expect(res.status).toBe(400);
  });
});

describe(`DELETE request`, () => {
  it(`should delete a post if url is "/api/articles/2N_TWZ"`, async () => {
    const res = await supertest(server).delete(`/api/articles/2N_TWZ`);
    const responseAfter = await supertest(server).get(`/api/articles/2N_TWZ`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(`2N_TWZ`);
    expect(responseAfter.status).toBe(400);
  });

  it(`should return 400 if url is "/api/articles/wrong-id"`, async () => {
    const res = await supertest(server).delete(`/api/articles/wrong-id`);
    expect(res.status).toBe(400);
  });

  it(`should delete a comment if url is "/api/articles/ydBW9N/comments/iLPx9M"`, async () => {
    const res = await supertest(server).delete(`/api/articles/ydBW9N/comments/iLPx9M`);
    const responseAfter = await supertest(server).get(`/api/articles/ydBW9N/comments`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(`iLPx9M`);

    const comment = responseAfter.body.find((it) => it.id === `iLPx9M`);
    expect(comment).toBeUndefined();
  });

  it(`should return 400 if url is "/api/articles/wrong-id/comments/iLPx9M"`, async () => {
    const res = await supertest(server).delete(`/api/articles/wrong-id/comments/iLPx9M`);
    expect(res.status).toBe(400);
  });

  it(`should return 400 if url is "/api/articles/ydBW9N/comments/wrong-id"`, async () => {
    const res = await supertest(server).delete(`/api/articles/ydBW9N/comments/wrong-id`);
    expect(res.status).toBe(400);
  });
});

describe(`PUT request`, () => {
  it(`should return 200 and update the post if url is "/api/articles/ydBW9N" and post is valid`, async () => {
    const res = await supertest(server).put(`/api/articles/ydBW9N`).send(validPostData);
    const responseAfter = await supertest(server).get(`/api/articles/ydBW9N`);
    expect(res.status).toBe(200);
    expect(validPostData.title).toBe(responseAfter.body.title);
  });

  it(`should return 400 and not update the post if url is "/api/articles/wrong-id" and post is valid`, async () => {
    const res = await supertest(server).put(`/api/articles/wrong-id`).send(validPostData);
    expect(res.status).toBe(400);
  });

  it(`should return 400 and not update the post if url is "/api/articles/ydBW9N" and post is not valid`, async () => {
    const responseBefore = await supertest(server).get(`/api/articles/ydBW9N`);
    const res = await supertest(server).put(`/api/articles/ydBW9N`).send(invalidPostData);
    const responseAfter = await supertest(server).get(`/api/articles/ydBW9N`);

    expect(res.status).toBe(400);
    expect(responseBefore.body.title).toBe(responseAfter.body.title);
  });

});

