export const PersonMixin = {
  data() {
    return {
      filterPerson: ''
    }
  },
  computed: {
    filteredPersons() {
      return this.personList.filter(element => {
        return element.name.toLowerCase().match(this.filterPerson.toLowerCase())
      })
    }
  }
}
