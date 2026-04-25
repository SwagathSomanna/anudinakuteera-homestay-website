export const srooms = {
  R1: {
    id: "01",
    name: "Robusta",
    type: "Room",
    description:
      "Largest suite with private sit-out, perfect for families. Sleeps up to 4 adults, max 2 children (6 total).",
    price: 5990,
    capacity: {
      minAdults: 1,
      maxAdults: 4,
      maxChildren: 3,
      maxTotal: 6,
    },
  },

  R2: {
    id: "02",
    name: "Arabica",
    type: "Room",
    description:
      "Refined guest suite with a private sit-out area. Sleeps up to 3 adults, max 1 child (4 total).",
    price: 3990,
    capacity: {
      minAdults: 1,
      maxAdults: 3,
      maxChildren: 2,
      maxTotal: 4,
    },
  },

  R3: {
    id: "03",
    name: "Excelsa",
    type: "Room",
    description:
      "Sunrise-facing loft with panoramic morning views. Sleeps up to 3 adults, max 1 child (4 total).",
    price: 4990,
    capacity: {
      minAdults: 1,
      maxAdults: 3,
      maxChildren: 2,
      maxTotal: 4,
    },
  },

  R4: {
    id: "04",
    name: "Liberica",
    type: "Room",
    description:
      "Sunrise-facing loft with peaceful morning dawn views. Sleeps up to 3 adults, max 1 child (4 total).",
    price: 4990,
    capacity: {
      minAdults: 1,
      maxAdults: 3,
      maxChildren: 2,
      maxTotal: 4,
    },
  },
};

import { Room} from "../models/villa.model.js";
const PROPERTY_ID = "69ec974283dc56254c1c66b0";

const addInitialPrices = async () => {
  try {
    const roomDocs = Object.entries(srooms).map(([roomId, room]) => ({
      propertyId: PROPERTY_ID,
      roomId,
      name: room.name,
      type: room.type,
      description: room.description,
      pricePerNight: room.price,
      capacity: room.capacity,
    }));

    for (const doc of roomDocs) {
      await Room.updateOne(
        { propertyId: doc.propertyId, roomId: doc.roomId },
        { $set: doc },
        { upsert: true },
      );
    }

    console.log("Base prices ensured");
  } catch (error) {
    console.log("Error adding base price");
    console.log(error.message);
  }
};


async function fixRoomIndexes() {
  const collection = Room.collection;

  // See current indexes
  const indexes = await collection.indexes();
  console.log("Current indexes:", indexes.map((i) => i.name));

  // Drop old roomId unique index if present
  const hasRoomIdIndex = indexes.some((i) => i.name === "roomId_1");
  if (hasRoomIdIndex) {
    await collection.dropIndex("roomId_1");
    console.log("Dropped index: roomId_1");
  }

  // Ensure desired compound unique index
  await collection.createIndex(
    { propertyId: 1, roomId: 1 },
    { unique: true, name: "propertyId_1_roomId_1" },
  );
  console.log("Ensured index: propertyId_1_roomId_1");
}

export default addInitialPrices;
export { fixRoomIndexes };

