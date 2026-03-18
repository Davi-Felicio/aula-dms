export class Professor {
  private readonly _id?: string;
  private _name: string;
  private _email: string;
  private _document: string;
  private _specialty: string;
  private readonly _createdAt?: Date;
  private readonly _updatedAt?: Date;

  private constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this._id = id;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get document(): string {
    return this._document;
  }

  get specialty(): string {
    return this._specialty;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  withName(name: string) {
    this._name = name;
    return this;
  }

  withEmail(email: string) {
    this._email = email;
    return this;
  }

  withDocument(document: string) {
    this._document = document;
    return this;
  }

  withSpecialty(specialty: string) {
    this._specialty = specialty;
    return this;
  }

  static restore(props?: {
    id?: string;
    name: string;
    email: string;
    document: string;
    specialty: string;
    createdAt?: Date;
    updatedAt?: Date;
  }): Professor | null {
    if (!props) return null;

    const professor = new Professor(props.id, props.createdAt, props.updatedAt);

    professor._name = props.name;
    professor._email = props.email;
    professor._document = props.document;
    professor._specialty = props.specialty;

    return professor;
  }
}
