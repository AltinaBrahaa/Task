using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Task.Migrations
{
    /// <inheritdoc />
    public partial class AddedFirstAndSecondProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "FirstProductId",
                table: "ProductImage",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SecondProductId",
                table: "ProductImage",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "FirstProducts",
                columns: table => new
                {
                    FirstProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OldPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    NewPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    City = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Size = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Discount = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FirstProducts", x => x.FirstProductId);
                    table.ForeignKey(
                        name: "FK_FirstProducts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "SecondProducts",
                columns: table => new
                {
                    SecondProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    OldPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    NewPrice = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    City = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Size = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Discount = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    UserId = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SecondProducts", x => x.SecondProductId);
                    table.ForeignKey(
                        name: "FK_SecondProducts_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_FirstProductId",
                table: "ProductImage",
                column: "FirstProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductImage_SecondProductId",
                table: "ProductImage",
                column: "SecondProductId");

            migrationBuilder.CreateIndex(
                name: "IX_FirstProducts_UserId",
                table: "FirstProducts",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SecondProducts_UserId",
                table: "SecondProducts",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductImage_FirstProducts_FirstProductId",
                table: "ProductImage",
                column: "FirstProductId",
                principalTable: "FirstProducts",
                principalColumn: "FirstProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProductImage_SecondProducts_SecondProductId",
                table: "ProductImage",
                column: "SecondProductId",
                principalTable: "SecondProducts",
                principalColumn: "SecondProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProductImage_FirstProducts_FirstProductId",
                table: "ProductImage");

            migrationBuilder.DropForeignKey(
                name: "FK_ProductImage_SecondProducts_SecondProductId",
                table: "ProductImage");

            migrationBuilder.DropTable(
                name: "FirstProducts");

            migrationBuilder.DropTable(
                name: "SecondProducts");

            migrationBuilder.DropIndex(
                name: "IX_ProductImage_FirstProductId",
                table: "ProductImage");

            migrationBuilder.DropIndex(
                name: "IX_ProductImage_SecondProductId",
                table: "ProductImage");

            migrationBuilder.DropColumn(
                name: "FirstProductId",
                table: "ProductImage");

            migrationBuilder.DropColumn(
                name: "SecondProductId",
                table: "ProductImage");
        }
    }
}
