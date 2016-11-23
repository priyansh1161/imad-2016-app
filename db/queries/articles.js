module.exports = function (pool) {
    return {
        findAll : function (limit, offset, cb) {
            limit = limit || 50;
            offset = offset || 0;
            pool.query(`SELECT * FROM "articles" LIMIT $1 OFFSET $2`,[limit, offset],cb);
        },
        deleteOne : function (ID,cb) {
            pool.query(`DELETE FROM "articles" WHERE "ID" = $1`,[ID],cb);
        },
        createArticle : function (obj,createdBy,cb) {
            pool.query(`INSERT INTO "articles" (title, body, created_by, category) VALUES ($1,$2,$3,$4)`,[obj.title,obj.body,createdBy,obj.category],cb);
        },
        findByCategory : function (category,limit,offset,cb) {
            pool.query(`SELECT * FROM "articles"  WHERE "category" = $3 LIMIT $1 OFFSET $2 `,[limit,offset,category],cb);
        },
        findById : function (id,cb) {
            pool.query(`SELECT * FROM "articles" WHERE "ID" = $1`,[id],cb);
        },
        addComment : function (article_id,obj,cb) {
            obj.comment.replace(/<(.?)>/ig,'$1');
            pool.query(`INSERT INTO "comments" (article_id, created_by, comment) VALUES ($1,$2,$3)`,[article_id, obj.created_by, obj.comment],cb);
        },
        findComments(article_id,cb){
            pool.query(`SELECT * FROM "comments" WHERE article_id = $1`,[article_id],cb);
        }
    }
};