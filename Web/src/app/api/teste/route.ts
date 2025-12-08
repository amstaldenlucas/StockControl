import { NextResponse } from "next/server";

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET() {
    await sleep(2000);    
  return NextResponse.json([{"name":"Notebook","price":1551.27,"productGroupId":1,"id":1,"isDeleted":false,"createdAt":"2025-12-04T14:21:06.9482215","lastUpdate":"2025-12-04T14:21:06.9482216"},{"name":"Mouse","price":57.8,"productGroupId":2,"id":2,"isDeleted":false,"createdAt":"2025-12-04T14:21:06.9482176","lastUpdate":"2025-12-04T14:21:06.9482206"}]);
}
