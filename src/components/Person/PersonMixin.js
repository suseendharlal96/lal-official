export const PersonMixin = {
  data() {
    return {
      filterPerson: ''
    }
  },
  computed: {
    filteredPersons() {
      return this.personList.filter(element => {
        return element.name.replace(" ","").toLowerCase().match(this.filterPerson.toLowerCase())
      })
    }
  }
}
