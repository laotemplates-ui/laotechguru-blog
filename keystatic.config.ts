import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "laotemplates-ui",
      name: "laotechguru-blog",
    },
  },
  collections: {
    posts: collection({
      label: "ບົດຄວາມ",
      slugField: "title",
      path: "posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({
          name: { label: "ຫົວຂໍ້ບົດຄວາມ" },
        }),
        date: fields.date({
          label: "ວັນທີ",
          defaultValue: { kind: "today" },
        }),
        description: fields.text({
          label: "ຄຳອະທິບາຍສັ້ນ (SEO + Card)",
          multiline: true,
        }),
        category: fields.select({
          label: "ໝວດໝູ່",
          options: [
            { label: "IT ທຸລະກິດ", value: "it-thurakit" },
            { label: "ການຂຽນໂປຣແກຣມ", value: "programming" },
            { label: "ຂ່າວໄອທີ", value: "khao-it" },
            { label: "ຄວາມປອດໄພໄຊເບີ", value: "cyber-security" },
            { label: "ຄອມພິວເຕີ & Hardware", value: "computer-hardware" },
            { label: "ເຕັກນິກ Office", value: "office-technique" },
            { label: "ແກ້ໄຂບັນຫາ", value: "kae-khai-banha" },
            { label: "ໂປຣແກຣມ & ເຄື່ອງມື", value: "program-tools" },
          ],
          defaultValue: "kae-khai-banha",
        }),
        image: fields.image({
          label: "ຮູບປົກ (ບໍ່ບັງຄັບ)",
          directory: "public/images",
          publicPath: "/images/",
        }),
        content: fields.markdoc({
          label: "ເນື້ອຫາບົດຄວາມ",
            extension: "md",   // ← ເພີ່ມແຖວນີ້
        }),
      },
    }),
  },
});