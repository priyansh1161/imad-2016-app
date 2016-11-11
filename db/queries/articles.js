module.exports = function (pool) {
    return {
        findAll : function (limit, offset, cb) {
            limit = limit || 50;
            offset = offset || 0;
            pool.query(`SELECT * FROM "articles" LIMIT $1 OFFSET $2`,[limit, offset],cb);
        },
        deleteOne : function (ID,cb) {
            pool.query(`DELETE FROM "articles" WHERE ID = $1`,[ID],cb);
        },
        createArticle : function (obj,cb) {
            pool.query(`INSET INTO "articles" (title, body, created_by, category) VALUES ($1,$2,$3,$4)`,[obj.title,obj.body,obj.createdBy,obj.category],cb);
        },
        findByCategory : function (category,limit,offset,cb) {
            pool.query(`SELECT * FROM "articles" LIMIT $1 OFFSET $2 WHERE category = $3`,[limit,offset,category],cb);
        },
        findById : function (id,cb) {
            pool.query(`SELECT * FROM "articles" WHERE ID = $1`,[id],cb);
        },
        addComment : function (article_id,obj,cb) {
        }

    }
};