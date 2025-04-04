export type Data = {
    child: {
        children_name: String,
        children_age: Number
      },
  deceased?: Deceased,
  animal?: Animal,
  notion?: Notion
} | {}

export type Child = {
    child: {
        children_name: String,
        children_age: Number
      },
}

export type Deceased = {
    deceased: {
        deceased_name: String,
        deceased_age: Number,
        deceased_is_animal: Boolean,
        deceased_animal_type: String
      },
}

export type Animal = {
    animal: {
        favorite_animal: String,
        is_pet: Boolean,
        pet_type: String,
        pet_name: String
      },
}

export type Notion = {
    notion: {
        is_paradise: Boolean,
        is_added_white_paper: Boolean,
        is_custom_para: Boolean,
        is_religion: Boolean,
        religion_type: String,
        custom_para: String
      }
}