Para criar migration precisa fazer o seguinte:

> Ir na raiz do projeto (onde está o arquivo .sql)
> rodar o comando:


dotnet ef migrations add AddedRefreshToken \
  --project "04 - Data/ControlStock.Data/ControlStock.Data.csproj" \
  --output-dir "04 - Data/Migrations" \
  --startup-project "01 - InterfaceClient/ControlStockApi/ControlStockApi.csproj"



OBS: substituir <Mensagem> pelo texto que desejar