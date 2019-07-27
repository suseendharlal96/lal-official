export const PersonMixin = {
  data() {
    return {
      filterPerson: ''
    }
  },
  computed: {
    filteredPersons() {
      return this.personList.filter(element => {
        return element.name.toLowerCase().replace(/\s/g, '').includes(this.filterPerson.toLowerCase().replace(/\s/g, ''))
      })
    }
  }
}
