export default {
  title: 'VerificationToken',
  name: 'verificationToken',
  type: 'document',
  fields: [
    {
      title: 'Identifier',
      name: 'identifier',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'token',
      title: 'Token',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'expires',
      name: 'expires',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'userId.username',
      subtitle: 'sessionToken',
    },
  },
  //   validation: (Rule) =>
  //     Rule.custom(async (sessionToken, context) => {
  //       // 세션 문서의 ID 가져오기
  //       const id = context.parent._id
  //       // 세션 문서와 동일한 sessionToken을 가진 다른 문서 검색
  //       const duplicateSession =
  //         context.parent._type === 'Session' &&
  //         context.parent._id &&
  //         (await context.sanity.client.fetch(
  //           `*[_type == "Session" && sessionToken == $sessionToken && _id != $id]`,
  //           {sessionToken, id}
  //         ))
  //       // 중복된 sessionToken이 있으면 오류 반환
  //       if (duplicateSession.length > 0) {
  //         return 'Session token must be unique'
  //       }
  //       // 중복된 sessionToken이 없으면 유효성 검사 통과
  //       return true
  //     }).error('Session token must be unique'),
}
